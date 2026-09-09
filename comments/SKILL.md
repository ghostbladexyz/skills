---

name: code-comments

description: Add context to dynamic logic and data mapping while skipping static declarations and boilerplate. Use when generating or refactoring code to improve readability.

---

# Code Commenting Format

Comments must explain "why" or "from where," rather than "what."

## Core Principle: Complete the Thought

**Don't just state a fact—complete the thought by explaining the consequence or action.** A comment should include both the *problem* and what we *do about it*.

- **Bad:** `// stdin lines include trailing newline`
- **Good:** `// Input lines have "\n" at the end, so we remove it`

- **Bad:** `// Edge case: few numbers`
- **Good:** `// Few or identical numbers can make range zero, so we force a minimum`

## Beginner-Friendly Rules

### 1. Be Explicit About Variables

Don't assume the reader knows what variables refer to. Name them in the comment.

- **Bad:** `# If >1% removed, dataset has significant outliers`
- **Good:** `# fn/n < 99% means >1% of values fell outside fences`

- **Bad:** `# 25th percentile`
- **Good:** `# Index n//4 is 25% into the sorted list (Q1)`

### 2. Explain Relationships Between Variables

When one variable depends on another, show the connection.

- **Bad:** `# Count of valid values`
- **Good:** `# Filtered count: sorted_nums[lo_idx:hi_idx] are non-outliers`

- **Bad:** `# Start of range`
- **Good:** `# First index >= lo_fence (start of valid range)`

### 3. Explain Why Order Matters

If the sequence of operations is important, say so.

- **Bad:** `# Insert the number`
- **Good:** `# Insert AFTER prediction so current num doesn't influence its own prediction`

### 4. Explain What Problem You're Preventing

When code handles an edge case, explain what would go wrong without it.

- **Bad:** `# Minimum range fallback`
- **Good:** `# Prevent zero-width range (e.g., "50 50" is useless as prediction)`

- **Bad:** `# Handle zero case`
- **Good:** `# IQR=0 means all values identical, so no outliers possible`

### 5. Explain Non-Obvious Math

When using formulas or magic numbers, explain what they represent.

- **Bad:** `# Tukey fence`
- **Good:** `# Tukey fence: values below this are outliers (1.5×IQR is standard threshold)`

- **Bad:** `# Use 36th percentile`
- **Good:** `# 36% into filtered range (tighter than quartiles for outlier-heavy data)`

## Function Doc Comments (Hover Descriptions)

Every function must have a doc comment directly above its declaration. This comment appears when hovering over the function name in an IDE (Ctrl+hover).

**Rules:**
- The comment **must start with the function name** (this is the convention in Go, and good practice in all languages).
- Keep it to **one sentence** that explains what the function does and any key context (e.g., where data comes from, what it returns).
- Use the language's IDE-recognized documentation syntax and place it immediately next to the function declaration.
- In JavaScript and TypeScript, use a JSDoc block beginning with `/**`; ordinary `//` comments do not provide reliable hover documentation across files.
- In Go, place the `// FunctionName ...` comment immediately above the `func` keyword with no blank line between them.
- In Python, use a docstring as the first statement in the function body.

**Examples:**

```go
// HomeHandler serves the main page by fetching all artists from the API and rendering the home template.
func HomeHandler(w http.ResponseWriter, r *http.Request) {
```

```go
// FetchRelation fetches all relations then filters by ID because the API has no single-relation endpoint.
func FetchRelation(id int) (*models.Relation, error) {
```

```go
// matchesSearch returns true if the query matches the artist's name or any member name (case-insensitive).
func matchesSearch(artist models.Artist, query string) bool {
```

```python
def calculate_total(items: list[Item]) -> int:
    """calculate_total sums the price of all non-discounted items in the list."""
```

```javascript
/**
 * initializeSpotlightBackground makes the reveal image follow the pointer and returns a cleanup function.
 *
 * @returns {() => void} A function that removes the pointer listener and stops animation.
 */
export function initializeSpotlightBackground() {
```

**This applies to all functions** — exported, unexported, helpers, handlers, and test helpers.

## Comment Placement

- **Inline:** Place next to the code line (`// comment`) for specific data assignments or logic.
- **Block:** Use the language's doc-comment syntax above functions; use ordinary block comments above loops or multi-line logic.
- **Don't use both** inline and block comments for the same line.

## Exclusion Rules (Skip these)

* **Static Constants:** e.g., `const maxTextLength = 4096` or `const Version = "1.0"`.
* **Standard Control Flow:** `return`, `break`, `continue` (when they are alone).
* **Basic Logging/Errors:** e.g., `log.Fatal(...)` or `fmt.Println`.
* **Well-known idioms:** e.g., `os.Args[1:]` or `if __name__ == "__main__":`

**Besides these exclusion rules, comment inline for everything else.**
**Comment inside test files as well, but use mostly block comments.**

## Examples

**Variable relationship:**
```python
fn = hi_idx - lo_idx  # Filtered count: sorted_nums[lo_idx:hi_idx] are non-outliers
```

**Index calculation with context:**
```python
q1 = sorted_nums[n // 4]  # Index n//4 is 25% into the sorted list (Q1)
```

**Order dependency:**
```python
bisect.insort(sorted_nums, num)  # Insert AFTER prediction so current num doesn't influence its own prediction
```

**Edge case prevention:**
```python
if hi <= lo:
    hi = lo + 28  # Prevent zero-width range (e.g., "50 50" is useless as prediction)
```

**Magic number with formula:**
```python
lo_fence = q1 - 1.5 * iqr  # Tukey fence: values below this are outliers
```

**Conditional with non-obvious purpose:**
```go
if r.URL.Path != "/" { // Exact match only; prevents "/" from being a catch-all
```

**Algorithm bound explanation:**
```go
for row := 0; row < charHeight-1; row++ { // -1 because 9th line is separator, not displayed
```

**Data flow origin:**
```go
text := r.FormValue("text") // Raw text from textarea (may contain \\n escape sequences)
```
