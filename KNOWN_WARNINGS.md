# Known TypeScript Warnings

## ⚠️ False Positive: MovieSearch Component Props

### Error Message

```
Props must be serializable for components in the "use client" entry file, "onSearch" is invalid.
```

### Location

`components/MovieSearch.tsx` line 10

### Why This Appears

This is a **false positive** from the Next.js TypeScript plugin. The error checking system is trying to ensure that components passed between server and client components only use serializable props (since data needs to cross the server-client boundary).

### Why This is Safe to Ignore

1. **Both components are client components**: Both `app/page.tsx` (parent) and `components/MovieSearch.tsx` (child) have the `'use client'` directive at the top.

2. **No server-client boundary**: When a client component passes props to another client component, there's no serialization needed because everything runs in the browser.

3. **Function props are standard React**: Passing callback functions as props (like `onSearch`) is a fundamental React pattern and works perfectly in this scenario.

4. **App works correctly**: As demonstrated by successful API calls and functioning search feature, this warning doesn't affect runtime behavior.

### Technical Background

The Next.js TypeScript plugin performs static analysis to catch potential server/client boundary violations. However, its detection algorithm sometimes produces false positives when:

- Both components are client components
- Props are passed between components in the same client bundle
- The type checking happens before the bundler resolves the actual component tree

### Attempted Fixes

- ✅ Verified 'use client' directives in both files
- ✅ Confirmed TypeScript types are correct
- ✅ Added TypeScript configuration comment
- ✅ Documented in project README
- ❌ Cannot suppress via `@ts-expect-error` (different error source)
- ❌ Cannot disable via ESLint rules (Next.js plugin error)
- ❌ Cannot configure via tsconfig.json (Next.js plugin internal logic)

### Resolution

✨ **This warning can be safely ignored**. It's a limitation of the static analysis tool, not an actual problem with the code.

### Verification

Run the app and test the search functionality - it works perfectly:

```bash
npm run dev
```

Visit `http://localhost:3001` and search for any IMDb ID (e.g., `tt0133093` for The Matrix). The app functions correctly despite this warning.

### References

- [Next.js GitHub Issue #52223](https://github.com/vercel/next.js/issues/52223) - Similar false positive reports
- [Next.js Docs: Server and Client Components](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)

---

**Last Updated**: March 3, 2026  
**Status**: Known false positive - no action needed
