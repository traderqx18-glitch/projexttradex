const mockClient = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: async () => ({ data: { user: null }, error: null }),
    signUp: async () => ({ data: { user: null }, error: null }),
    signOut: async () => ({ error: null }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: null }),
        order: () => Promise.resolve({ data: [], error: null }),
        then: (cb) => Promise.resolve({ data: [], error: null }).then(cb),
      }),
      order: () => Promise.resolve({ data: [], error: null }),
      then: (cb) => Promise.resolve({ data: [], error: null }).then(cb),
    }),
    insert: async () => ({ data: null, error: null }),
    update: async () => ({ data: null, error: null }),
    delete: async () => ({ data: null, error: null }),
  }),
  channel: () => ({
    on: function() { return this; },
    subscribe: function() { return this; },
  }),
};

export function t(url, key, options) {
  return mockClient;
}

export default mockClient;
