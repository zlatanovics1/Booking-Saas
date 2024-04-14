import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Could not load cabins!");
  }

  return data;
}

//https:ifelmjptlvduxvvawdsi.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

export async function createEditCabin(cabin, id) {
  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");
  const hasImagePath = cabin.image?.startsWith?.(supabaseUrl);
  const imagePath = hasImagePath
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = await supabase.from("cabins");
  if (!id) query = query.insert([{ ...cabin, image: imagePath }]);

  if (id) query = query.update({ ...cabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  if (error) throw new Error("Could not create cabin!");

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image);

  if (storageError) {
    console.log(storageError.message);
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Could not upload image. The cabin is deleted.");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) throw new Error("Could not delete cabin!");

  return data;
}
