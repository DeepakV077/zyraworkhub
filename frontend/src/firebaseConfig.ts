// Re-export the root-level firebase config initialization so imports that
// reference `src/firebaseConfig` keep working. The real initialization lives
// at `../firebaseConfig.ts` (project root) and is the single source of truth.
export * from "../firebaseConfig";
export { default } from "../firebaseConfig";
