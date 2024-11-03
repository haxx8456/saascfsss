function mockWorkerdFetch() {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async function (...args) {
      try {
        return await originalFetch.apply(this, args);
      } catch (e) {
        if (!args[1] || typeof args[1] !== 'object') throw e;
   
        const unimplementedCacheError =
          e &&
          typeof e === 'object' &&
          'message' in e &&
          e.message ===
            "The 'cache' field on 'RequestInitializerDict' is not implemented.";
        if (!unimplementedCacheError) throw e;
   
        const newOpts = { ...args[1] };
        delete newOpts.cache;
        return originalFetch.apply(this, [args[0], newOpts]);
      }
    };
  }
   
  mockWorkerdFetch();