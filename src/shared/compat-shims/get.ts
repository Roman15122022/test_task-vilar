type PathSegment = string | number | symbol;
type Path = PathSegment | readonly PathSegment[];

const unsafeKeys = new Set<PathSegment>(["__proto__", "constructor", "prototype"]);

const parseStringPath = (path: string) =>
  path
    .replace(/\[(\d+)\]/g, ".$1")
    .replace(/^\./, "")
    .split(".")
    .filter(Boolean);

const toPathSegments = (path: Path) =>
  Array.isArray(path) ? path : typeof path === "string" ? parseStringPath(path) : [path];

export default function get<TDefault = undefined>(
  value: unknown,
  path: Path,
  defaultValue?: TDefault,
) {
  let currentValue = value;

  for (const pathSegment of toPathSegments(path)) {
    if (currentValue == null || unsafeKeys.has(pathSegment)) {
      return defaultValue;
    }

    currentValue = (currentValue as Record<PathSegment, unknown>)[pathSegment];
  }

  return currentValue === undefined ? defaultValue : currentValue;
}
