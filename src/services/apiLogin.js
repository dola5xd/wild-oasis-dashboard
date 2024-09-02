import supabase from "./supabaseClint";

export async function Login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function signUp({ email, password, fullName }) {
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

  return data;
}

export async function updateUser({ fullName, avatar, password }) {
  let uptadedData;

  if (password) uptadedData = { password };
  if (fullName) uptadedData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(uptadedData);

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  // Upload avatar

  const avatarName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: StorageError } = await supabase.storage
    .from("avatars")
    .upload(avatarName, avatar);

  if (StorageError) throw new Error(StorageError.message);

  const { data: uptadeUser, error: uptadeUsererror } =
    await supabase.auth.updateUser({
      data: {
        avatar: `https://fkzrriwljbpwxbtrwteb.supabase.co/storage/v1/object/public/avatars/${avatarName}`,
      },
    });
  if (uptadeUsererror) throw new Error(uptadeUsererror.message);

  return uptadeUser;
}
