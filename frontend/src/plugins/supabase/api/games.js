import { supabase } from "../client";

const getAll = async () => {
  const { data, error } = await supabase
    .from("games").select()

  if (error) {
    throw error
  }

  return data;
}

const create = async game => {
  const { data, error } = await supabase
    .from("games")
    .insert([game])

  if (error) {
    throw error
  }

  return data;
}

export default {
  getAll,
  create,
}
