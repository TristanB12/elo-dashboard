import { supabase } from "../client";

const getAll = async () => {
  const { data, error } = await supabase
    .from("profiles").select()

  if (error) {
    throw error
  }

  return data;
}

const updateEloScore = async (userId, newEloScore) => {
  const { data, error } = await supabase
    .from("profiles")
    .update({ elo_score: newEloScore })
    .eq('user_id', userId)

  if (error) {
    throw error
  }

  return data;
}

export default {
  getAll,
  updateEloScore,
}
