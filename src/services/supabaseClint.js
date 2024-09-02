import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://fkzrriwljbpwxbtrwteb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrenJyaXdsamJwd3hidHJ3dGViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI1MTU2NDEsImV4cCI6MjAzODA5MTY0MX0.LaTLJY5osW3b8yLvE_gmVbd9x3WgzUzvR3exizhwbY8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
