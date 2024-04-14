import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ifelmjptlvduxvvawdsi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmZWxtanB0bHZkdXh2dmF3ZHNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQzMTgxOTMsImV4cCI6MjAxOTg5NDE5M30.81Kge_-PyjWdHZ9nvVe-9b6LnwyGFuesJd-Gda9G8-Y";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
