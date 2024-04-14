import supabase, { supabaseUrl } from "./supabase";

export async function loginUser({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error("Incorrect email or password!");

  return { data, error };
}

export async function getUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log("error:", error.message);
    throw new Error(error.message);
  }

  return data?.user;
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function signupUser({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);
  console.log(data);
  return data;
}

export async function updateUser({ password, fullName, avatar }) {
  // `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  const imageName = `avatar-${data.id}-${Math.random()}`;
  const fileName = `${supabaseUrl}/storage/v1/object/public/avatars/${imageName}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(imageName, avatar);

  if (storageError) throw new Error(storageError.message);

  const { data: dataImageUpload, error: errorImageUpload } =
    await supabase.auth.updateUser({ data: { avatar: fileName } });
  if (errorImageUpload) throw new Error(errorImageUpload.message);

  return dataImageUpload;
}
