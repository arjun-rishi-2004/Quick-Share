import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ajkgcnqycvxizjwhyrxg.supabase.co";
const supabaseKey = "sb_publishable_CQ2w4MppOtL6s72cDElMmA_d36LHeZu";

export const supabase = createClient(supabaseUrl, supabaseKey);
export const BUCKET = "uploaded-files";
