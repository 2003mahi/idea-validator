const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

async function checkConnection() {
  console.log("Checking Supabase connection based on .env config...");
  const envFile = fs.readFileSync('.env', 'utf8');
  
  let supabaseUrl = '';
  let supabaseKey = '';

  envFile.split('\n').forEach(line => {
    if (line.includes('VITE_SUPABASE_URL=')) supabaseUrl = line.split('=')[1].replace(/"/g, '').trim();
    if (line.includes('VITE_SUPABASE_PUBLISHABLE_KEY=')) supabaseKey = line.split('=')[1].replace(/"/g, '').trim();
  });

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing credentials in .env file");
    process.exit(1);
  }

  console.log("URL:", supabaseUrl);
  console.log("Key Found:", !!supabaseKey);

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Perform a lightweight network test
  const { data, error } = await supabase.from('profiles').select('*').limit(1);

  if (error) {
    console.log("Connection Failed:", error.message);
  } else {
    console.log("Successfully connected to your personalized Supabase Database!");
  }
}

checkConnection();
