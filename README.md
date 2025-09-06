# First Steps with React

This project aims to provide a guide to learn React.js with TypeScript.

## Tech Stack

- **Language:** TypeScript
- **Framework/Library:** React, Vite
- **Styling:** CSS Modules, TailwindCSS
- **Testing:** Vitest, React Testing Library

## Code Conventions

- **Style:** Follow ESLint rules from `eslint.config.js` and project formatting rules (e.g., Prettier). Code must pass lint/format checks before commit.
- **Naming:** Components in PascalCase, hooks in camelCase with the `use` prefix.
- **Commits:** Use Conventional Commits format: `type(scope): description` (e.g., `feat(auth): add login route`).

## Architecture and Structure

- `src/components`: Contains reusable components.
- `src/helpers`: Contains utility functions.
- `src/assets`: Contains static assets like images or SVGs.

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in the development mode.
- `npm run build`: Builds the app for production.
- `npm run lint`: Lints the code.
- `npm run preview`: Previews the production build.
- `npm run test`: Runs the tests.
- `npm run test:ui`: Runs the tests with UI.
- `npm run coverage`: Generates test coverage report.

## Future Changes

This section will track future code changes.

## React Performance Optimization: Event Handling in Lists

### The Concern

In the context of building a React application with dynamic lists, a common question arises regarding performance implications: "If I had 1000 `<li>` items, how many `handleSearch` functions will React create?" This inquiry stems from the need to understand how React handles event handlers in rendered lists, particularly when each list item requires interactive functionality.

### Original Implementation Analysis

Initially, the `PreviousSearches` component implemented event handling as follows:

```tsx
// Original inefficient approach
{
  searches.map((search) => (
    <li key={search.id} onClick={() => handleSearch(search.gifName)}>
      {search.gifName}
    </li>
  ));
}
```

In this pattern:

- Each `<li>` element receives an inline arrow function: `() => handleSearch(search.gifName)`.
- For a list of 1000 items, React creates **1000 separate function instances** during each render.
- These functions are closures that capture the `search.gifName` value, leading to increased memory usage.
- The inefficiency arises because React's reconciliation process treats each function as a new object, potentially triggering unnecessary re-renders and garbage collection overhead.

This approach, while functional for small lists, becomes problematic at scale, violating React's performance best practices for handling events in dynamic collections.

### Optimized Solution

To address this performance bottleneck, we implemented a true optimization using **event delegation** and **state lifting**:

```tsx
// Optimized approach
interface Props {
  title: string;
  searches: { gifName: string; id: number }[];
  onSearch: (gifName: string) => void;
}

export const PreviousSearches: React.FC<Props> = ({
  title,
  searches,
  onSearch,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement;
    const gifName = target.dataset.gifname;
    if (gifName) {
      onSearch(gifName);
    }
  };

  return (
    <div className="previous-searches">
      <h2>{title}</h2>
      <ul className="previous-searches-list">
        {searches.map((search) => (
          <li
            key={search.id}
            data-gifname={search.gifName}
            onClick={handleClick}
          >
            {search.gifName}
          </li>
        ))}
      </ul>
    </div>
  );
};
```

Key optimizations:

- **Single Function Instance**: Only one `handleClick` function is created per component render, regardless of list size.
- **Event Delegation**: The handler uses `e.target.dataset.gifname` to identify the clicked item, eliminating per-item function creation.
- **State Lifting**: The `onSearch` prop is passed from the parent component (`GifsApp`), following React's composition patterns and ensuring the search logic resides at the appropriate level.

### Performance Benefits

This optimization yields significant improvements:

- **Memory Efficiency**: Reduces function object creation from N (list size) to 1.
- **Render Performance**: Minimizes reconciliation overhead by maintaining stable function references.
- **Scalability**: Handles large lists (e.g., 1000+ items) without exponential performance degradation.
- **Best Practices Alignment**: Demonstrates proper event handling and component composition in React applications.

### Academic Insights

For students learning React, this case study illustrates:

- The importance of understanding JavaScript closures and their impact on React's rendering cycle.
- How event delegation can optimize performance in list-based components.
- The value of state lifting for maintaining clean component hierarchies.
- The need to profile and optimize code early, especially when dealing with dynamic data structures.

This optimization serves as a practical example of balancing functionality with performance in modern web development, emphasizing that even small changes in implementation can yield substantial improvements at scale.
