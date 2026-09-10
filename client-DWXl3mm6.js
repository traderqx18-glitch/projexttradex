import { t as createClient } from "./dist-CWMIw2fl.js";

const client = createClient("https://skqfapqbqbrbuageiyea.supabase.co", "anon", {
  auth: {
    storage: typeof window !== "undefined" ? localStorage : undefined,
    storageKey: "okaybroker-trading-auth",
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  }
});

export { client as t };
export default client;
