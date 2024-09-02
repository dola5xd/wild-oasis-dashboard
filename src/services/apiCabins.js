import supabase, { supabaseUrl } from "./supabaseClint";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) throw new Error("cabins cant be Loaded!");
  return data;
}

export async function deleteCabins(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error("cabins cant be Deleted!");
  return data;
}

export async function createEditCabin(newCabin, id) {
  // check if uptade image or not
  const imageURL = typeof newCabin.image === "string" ? newCabin.image : "";

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  // check if url wxist or make one
  const imagePath = imageURL
    ? imageURL
    : `${supabaseUrl}/storage/v1/object/public/cabin.images/${imageName}`;

  // 1) Create/Edit Cabin

  // set repeat code
  let query = supabase.from("cabins");

  // A) Create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) Uptade Cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select();

  // handel Create/Edit errors
  if (error) throw new Error("cabins cant be Created!");

  //2) upload Image
  // check if we hav url or need to upload
  if (typeof newCabin.image === "string") return data;

  const { error: uploadImage } = await supabase.storage
    .from("cabin.images")
    .upload(`/${imageName}`, newCabin.image, {
      upsert: true,
    });

  // handel uplad image errors
  if (uploadImage) {
    await supabase.from("cabins").delete().eq("id", data.at(0).id);
    throw new Error("Cant upload image!");
  }

  return data;
}
