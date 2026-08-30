export interface Lesson {
  title: string
  description: string
  topics: string[]
}

export interface CheatItem {
  syntax: string
  meaning: string
}

export interface CheatGroup {
  title: string
  items: CheatItem[]
}

export interface CourseQuizQuestion {
  question: string
  options: string[]
  correct: number
  explanation: string
}

export interface CourseDefinition {
  slug: string
  title: string
  eyebrow: string
  category: 'Foundation' | 'Frontend' | 'Backend' | 'Language'
  level: 'Beginner' | 'Beginner to intermediate'
  accent: string
  softAccent: string
  tagline: string
  description: string
  duration: string
  prerequisites: string[]
  officialUrl: string
  lessons: Lesson[]
  example: {
    title: string
    file: string
    explanation: string
    code: string
  }
  cheatSheet: CheatGroup[]
  quiz: CourseQuizQuestion[]
  project: {
    title: string
    description: string
    requirements: string[]
  }
}

export const courses: CourseDefinition[] = [
  {
    slug: 'html',
    title: 'HTML',
    eyebrow: 'Structure the web',
    category: 'Foundation',
    level: 'Beginner',
    accent: '#e44d26',
    softAccent: '#fff0eb',
    tagline: 'Give every page clear meaning and structure.',
    description: 'Learn semantic elements, accessible content, links, images, tables, forms, metadata, and the document structure every website needs.',
    duration: '4–6 hours',
    prerequisites: ['No coding experience required'],
    officialUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content',
    lessons: [
      { title: 'Document anatomy', description: 'Understand doctype, html, head, metadata, and body.', topics: ['doctype', 'language', 'meta viewport', 'title'] },
      { title: 'Text and semantics', description: 'Choose elements for meaning instead of appearance.', topics: ['headings', 'paragraphs', 'lists', 'emphasis'] },
      { title: 'Links and media', description: 'Connect pages and add accessible images and media.', topics: ['URLs', 'anchors', 'images', 'alt text'] },
      { title: 'Page landmarks', description: 'Build a structure that people and assistive technology understand.', topics: ['header', 'nav', 'main', 'article', 'footer'] },
      { title: 'Tables and forms', description: 'Represent data and collect user input correctly.', topics: ['labels', 'input types', 'validation', 'table headers'] },
      { title: 'Accessibility basics', description: 'Use native HTML first and test keyboard navigation.', topics: ['semantic controls', 'focus', 'labels', 'ARIA restraint'] },
    ],
    example: {
      title: 'A semantic article page',
      file: 'index.html',
      explanation: 'The element names explain the page structure before any CSS is added.',
      code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>My learning journal</title>
  </head>
  <body>
    <header>
      <nav aria-label="Primary"><a href="/">Home</a></nav>
    </header>
    <main>
      <article>
        <h1>What I learned today</h1>
        <p>Semantic HTML gives content meaning.</p>
      </article>
    </main>
    <footer><small>Made while learning HTML</small></footer>
  </body>
</html>`,
    },
    cheatSheet: [
      { title: 'Document', items: [
        { syntax: '<!doctype html>', meaning: 'Use modern HTML parsing' },
        { syntax: '<html lang="en">', meaning: 'Set the document language' },
        { syntax: '<meta charset="UTF-8">', meaning: 'Use UTF-8 text encoding' },
        { syntax: '<meta name="viewport" ...>', meaning: 'Make mobile sizing correct' },
        { syntax: '<title>Page title</title>', meaning: 'Set the browser/search title' },
      ] },
      { title: 'Content', items: [
        { syntax: '<h1>…</h1>', meaning: 'Main page heading' },
        { syntax: '<p>…</p>', meaning: 'Paragraph' },
        { syntax: '<a href="/about">…</a>', meaning: 'Link to another location' },
        { syntax: '<img src="…" alt="…">', meaning: 'Image with text alternative' },
        { syntax: '<ul><li>…</li></ul>', meaning: 'Unordered list' },
      ] },
      { title: 'Structure and forms', items: [
        { syntax: '<main>…</main>', meaning: 'Unique main content' },
        { syntax: '<section aria-labelledby="…">', meaning: 'Themed content group' },
        { syntax: '<label for="email">', meaning: 'Accessible input name' },
        { syntax: '<input id="email" type="email">', meaning: 'Email input and keyboard' },
        { syntax: '<button type="submit">', meaning: 'Submit a form' },
      ] },
    ],
    quiz: [
      { question: 'Which element should contain the unique content of a page?', options: ['<div>', '<main>', '<span>', '<meta>'], correct: 1, explanation: '<main> identifies the page’s primary unique content.' },
      { question: 'What is the most important purpose of image alt text?', options: ['SEO tricks', 'Make the image larger', 'Provide an equivalent for people who cannot see it', 'Change the file name'], correct: 2, explanation: 'Useful alt text communicates the image’s purpose or content when it cannot be seen.' },
      { question: 'How should an input get its visible accessible name?', options: ['Placeholder only', 'A connected <label>', 'A CSS class', 'A comment'], correct: 1, explanation: 'A label connected with for/id gives the input a reliable accessible name.' },
    ],
    project: { title: 'Accessible personal profile', description: 'Create a multi-section profile page using only semantic HTML.', requirements: ['Logical heading order', 'Navigation landmarks', 'Accessible image', 'Contact form with labels', 'Validated HTML'] },
  },
  {
    slug: 'css',
    title: 'CSS',
    eyebrow: 'Style and layout',
    category: 'Foundation',
    level: 'Beginner',
    accent: '#2965f1',
    softAccent: '#edf3ff',
    tagline: 'Turn clear HTML into responsive interfaces.',
    description: 'Learn selectors, the cascade, box model, spacing, typography, Flexbox, Grid, responsive design, states, and maintainable styling.',
    duration: '6–8 hours',
    prerequisites: ['HTML elements and classes'],
    officialUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics',
    lessons: [
      { title: 'Rules and selectors', description: 'Target the right elements and understand declarations.', topics: ['type', 'class', 'attribute', 'pseudo-class'] },
      { title: 'Cascade and specificity', description: 'Predict which declaration wins and avoid override wars.', topics: ['source order', 'inheritance', 'specificity', 'layers'] },
      { title: 'Box model', description: 'Control content, padding, borders, and margins.', topics: ['box-sizing', 'width', 'overflow', 'spacing'] },
      { title: 'Flexible layouts', description: 'Build one-dimensional and two-dimensional layouts.', topics: ['Flexbox', 'Grid', 'gap', 'alignment'] },
      { title: 'Responsive design', description: 'Adapt content to available space and user preferences.', topics: ['fluid sizing', 'media queries', 'container queries', 'reduced motion'] },
      { title: 'Design systems', description: 'Reuse tokens and components without tightly coupling selectors.', topics: ['custom properties', 'utility classes', 'components', 'states'] },
    ],
    example: {
      title: 'A responsive card grid', file: 'styles.css', explanation: 'Grid handles columns, clamp keeps type fluid, and the media query simplifies smaller screens.',
      code: `:root {
  --brand: #2965f1;
  --space: clamp(1rem, 3vw, 2rem);
}

* { box-sizing: border-box; }

.cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space);
}

.card {
  padding: var(--space);
  border: 1px solid #dbe2ee;
  border-radius: 1rem;
}

.card:focus-within { outline: 3px solid var(--brand); }

@media (max-width: 48rem) {
  .cards { grid-template-columns: 1fr; }
}`,
    },
    cheatSheet: [
      { title: 'Selectors', items: [
        { syntax: '.card', meaning: 'Class selector' }, { syntax: '#hero', meaning: 'ID selector' }, { syntax: '[disabled]', meaning: 'Attribute selector' }, { syntax: ':hover', meaning: 'Pointer hover state' }, { syntax: ':focus-visible', meaning: 'Visible keyboard focus' },
      ] },
      { title: 'Layout', items: [
        { syntax: 'display: flex', meaning: 'One-dimensional layout' }, { syntax: 'display: grid', meaning: 'Rows and columns' }, { syntax: 'gap: 1rem', meaning: 'Space between children' }, { syntax: 'margin-inline: auto', meaning: 'Center a fixed-width block' }, { syntax: 'position: sticky', meaning: 'Stick within scroll container' },
      ] },
      { title: 'Responsive', items: [
        { syntax: 'width: min(100%, 70rem)', meaning: 'Fluid maximum width' }, { syntax: 'font-size: clamp(1rem, 3vw, 2rem)', meaning: 'Fluid bounded size' }, { syntax: '@media (min-width: 48rem)', meaning: 'Viewport breakpoint' }, { syntax: 'var(--brand)', meaning: 'Read a custom property' }, { syntax: 'box-sizing: border-box', meaning: 'Include padding in width' },
      ] },
    ],
    quiz: [
      { question: 'Which layout is best for rows and columns together?', options: ['Float', 'Grid', 'Inline', 'Absolute positioning'], correct: 1, explanation: 'CSS Grid is designed for two-dimensional row-and-column layouts.' },
      { question: 'What does box-sizing: border-box do?', options: ['Removes the border', 'Includes padding and border in declared size', 'Makes text bold', 'Centers the box'], correct: 1, explanation: 'The declared width and height include content, padding, and border.' },
      { question: 'Which state is best for keyboard focus styling?', options: [':hover', ':first-child', ':focus-visible', ':empty'], correct: 2, explanation: ':focus-visible shows focus when the browser determines a visible indicator is useful.' },
    ],
    project: { title: 'Responsive dashboard', description: 'Style a dashboard that works from mobile to desktop without horizontal overflow.', requirements: ['Design tokens', 'Grid and Flexbox', 'Visible focus states', 'Mobile breakpoint', 'Reduced-motion support'] },
  },
  {
    slug: 'javascript',
    title: 'JavaScript',
    eyebrow: 'Program the web',
    category: 'Foundation',
    level: 'Beginner to intermediate',
    accent: '#b58b00',
    softAccent: '#fff8d9',
    tagline: 'Make pages think, react, and communicate.',
    description: 'Learn values, variables, functions, arrays, objects, control flow, DOM events, modules, promises, async/await, fetch, and error handling.',
    duration: '10–14 hours',
    prerequisites: ['Basic HTML', 'Basic CSS'],
    officialUrl: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting',
    lessons: [
      { title: 'Values and variables', description: 'Store and transform strings, numbers, booleans, null, and objects.', topics: ['const', 'let', 'types', 'operators'] },
      { title: 'Decisions and loops', description: 'Control what executes and how often.', topics: ['if', 'switch', 'for…of', 'while'] },
      { title: 'Functions and scope', description: 'Create reusable behavior with clear inputs and outputs.', topics: ['parameters', 'return', 'arrow functions', 'closures'] },
      { title: 'Arrays and objects', description: 'Model and transform collections of real data.', topics: ['map', 'filter', 'find', 'destructuring'] },
      { title: 'DOM and events', description: 'Connect JavaScript behavior to accessible HTML.', topics: ['querySelector', 'addEventListener', 'classList', 'forms'] },
      { title: 'Async JavaScript', description: 'Work with APIs without blocking the page.', topics: ['Promise', 'async/await', 'fetch', 'try/catch'] },
    ],
    example: {
      title: 'Load and render tasks', file: 'tasks.js', explanation: 'The function awaits HTTP data, checks failure explicitly, and renders without mutating the source array.',
      code: `async function loadTasks() {
  const list = document.querySelector('#tasks');

  try {
    const response = await fetch('/api/tasks');
    if (!response.ok) throw new Error('Could not load tasks');

    const tasks = await response.json();
    list.replaceChildren(
      ...tasks.map((task) => {
        const item = document.createElement('li');
        item.textContent = task.title;
        return item;
      }),
    );
  } catch (error) {
    list.textContent = error.message;
  }
}

loadTasks();`,
    },
    cheatSheet: [
      { title: 'Core syntax', items: [
        { syntax: 'const name = "Ana"', meaning: 'Constant binding' }, { syntax: 'let count = 0', meaning: 'Reassignable binding' }, { syntax: 'value === expected', meaning: 'Strict equality' }, { syntax: '`Hello ${name}`', meaning: 'Template string' }, { syntax: 'condition ? yes : no', meaning: 'Conditional expression' },
      ] },
      { title: 'Collections', items: [
        { syntax: 'items.map(fn)', meaning: 'Transform every item' }, { syntax: 'items.filter(fn)', meaning: 'Keep matching items' }, { syntax: 'items.find(fn)', meaning: 'Find first match' }, { syntax: 'const { id } = user', meaning: 'Object destructuring' }, { syntax: '[...items, next]', meaning: 'Create array with new item' },
      ] },
      { title: 'Browser and async', items: [
        { syntax: 'document.querySelector(".card")', meaning: 'Find first matching element' }, { syntax: 'button.addEventListener("click", fn)', meaning: 'Handle an event' }, { syntax: 'await fetch(url)', meaning: 'Wait for HTTP response' }, { syntax: 'try { … } catch (error) { … }', meaning: 'Handle thrown errors' }, { syntax: 'export { loadTasks }', meaning: 'Export from a module' },
      ] },
    ],
    quiz: [
      { question: 'Which array method returns only matching values?', options: ['map', 'filter', 'forEach', 'push'], correct: 1, explanation: 'filter returns a new array containing values for which the callback returns true.' },
      { question: 'What must an async function always return?', options: ['A DOM node', 'A Promise', 'A string', 'undefined'], correct: 1, explanation: 'An async function always returns a Promise, even when you return a plain value.' },
      { question: 'Why check response.ok after fetch?', options: ['fetch rejects on every HTTP error', 'HTTP 404/500 do not automatically reject fetch', 'It makes JSON faster', 'It enables CSS'], correct: 1, explanation: 'fetch rejects for network failures, but HTTP error statuses still produce a Response.' },
    ],
    project: { title: 'Task manager', description: 'Build an accessible browser-based task manager with persistent data.', requirements: ['Form events', 'Array transformations', 'DOM rendering', 'LocalStorage or API', 'Error and empty states'] },
  },
  {
    slug: 'vue',
    title: 'Vue 3',
    eyebrow: 'Progressive UI framework',
    category: 'Frontend',
    level: 'Beginner to intermediate',
    accent: '#2f9e78',
    softAccent: '#eaf8f3',
    tagline: 'Build reactive interfaces one component at a time.',
    description: 'Learn Vue Single-File Components, Composition API, reactivity, templates, events, props, emits, computed state, composables, forms, and Vue Router.',
    duration: '10–12 hours',
    prerequisites: ['HTML', 'CSS', 'Modern JavaScript'],
    officialUrl: 'https://vuejs.org/guide/introduction',
    lessons: [
      { title: 'Single-File Components', description: 'Keep component logic, template, and scoped styles together.', topics: ['script setup', 'template', 'style scoped', 'imports'] },
      { title: 'Reactivity', description: 'Use refs and computed values to keep the UI synchronized.', topics: ['ref', 'reactive', 'computed', 'watch'] },
      { title: 'Templates and events', description: 'Render dynamic data and react to user actions.', topics: ['interpolation', 'v-bind', 'v-if', 'v-for', 'v-on'] },
      { title: 'Component communication', description: 'Build clear data flow between parents and children.', topics: ['defineProps', 'defineEmits', 'slots', 'v-model'] },
      { title: 'Composables and state', description: 'Extract reusable stateful behavior.', topics: ['useSomething', 'lifecycle', 'Pinia', 'provide/inject'] },
      { title: 'Vue Router', description: 'Map URLs to pages and handle parameters and navigation.', topics: ['routes', 'RouterLink', 'RouterView', 'guards'] },
    ],
    example: {
      title: 'A reactive task list', file: 'TaskList.vue', explanation: 'ref stores state, computed derives filtered state, and the template reacts automatically.',
      code: `<script setup lang="ts">
import { computed, ref } from 'vue'

const tasks = ref([{ id: 1, title: 'Learn refs', done: false }])
const showDone = ref(false)

const visibleTasks = computed(() =>
  tasks.value.filter((task) => showDone.value || !task.done),
)
</script>

<template>
  <label><input v-model="showDone" type="checkbox" /> Show done</label>
  <ul>
    <li v-for="task in visibleTasks" :key="task.id">
      {{ task.title }}
    </li>
  </ul>
</template>`,
    },
    cheatSheet: [
      { title: 'Reactivity', items: [
        { syntax: 'const count = ref(0)', meaning: 'Reactive primitive/value' }, { syntax: 'count.value++', meaning: 'Update a ref in script' }, { syntax: 'reactive({ ... })', meaning: 'Reactive object proxy' }, { syntax: 'computed(() => ...)', meaning: 'Cached derived value' }, { syntax: 'watch(source, callback)', meaning: 'Run side effect on change' },
      ] },
      { title: 'Templates', items: [
        { syntax: '{{ message }}', meaning: 'Render text' }, { syntax: ':class="classes"', meaning: 'Bind an attribute' }, { syntax: '@click="save"', meaning: 'Listen for event' }, { syntax: 'v-if="ready"', meaning: 'Conditional rendering' }, { syntax: 'v-for="item in items" :key="item.id"', meaning: 'List rendering' },
      ] },
      { title: 'Components and router', items: [
        { syntax: 'defineProps<{ id: string }>()', meaning: 'Typed component inputs' }, { syntax: 'defineEmits<{ save: [] }>()', meaning: 'Typed component events' }, { syntax: 'onMounted(() => ...)', meaning: 'Mounted lifecycle hook' }, { syntax: '<RouterLink to="/about">', meaning: 'Client-side link' }, { syntax: 'const route = useRoute()', meaning: 'Access current route' },
      ] },
    ],
    quiz: [
      { question: 'How do you update a ref inside script setup?', options: ['count++', 'count.value++', 'this.count++', 'setCount(count + 1)'], correct: 1, explanation: 'Refs expose their stored value through .value in JavaScript; templates unwrap them automatically.' },
      { question: 'What should every stateful v-for item have?', options: ['An ID selector', 'A stable :key', 'A watch', 'A slot'], correct: 1, explanation: 'A stable primitive key helps Vue preserve the identity of rendered items.' },
      { question: 'Which API creates a cached derived value?', options: ['ref', 'computed', 'onMounted', 'defineEmits'], correct: 1, explanation: 'computed derives a value and only recalculates when its reactive dependencies change.' },
    ],
    project: { title: 'Learning tracker', description: 'Build a routed Vue app that tracks courses and progress.', requirements: ['Composition API', 'Typed props and emits', 'Computed filtering', 'Vue Router pages', 'Persistent progress'] },
  },
  {
    slug: 'angular',
    title: 'Angular',
    eyebrow: 'Full frontend platform',
    category: 'Frontend',
    level: 'Beginner to intermediate',
    accent: '#d62f73',
    softAccent: '#fff0f6',
    tagline: 'Build structured applications that scale.',
    description: 'Learn standalone components, templates, signals, services, dependency injection, forms, HTTP, routing, guards, testing, and Angular project structure.',
    duration: '12–16 hours',
    prerequisites: ['HTML', 'CSS', 'JavaScript', 'TypeScript basics'],
    officialUrl: 'https://angular.dev/overview',
    lessons: [
      { title: 'Standalone components', description: 'Understand component classes, selectors, templates, and styles.', topics: ['@Component', 'imports', 'template', 'change detection'] },
      { title: 'Templates', description: 'Bind state, events, classes, and conditional content.', topics: ['interpolation', 'property binding', 'event binding', 'control flow'] },
      { title: 'Signals and state', description: 'Model writable and derived reactive state.', topics: ['signal', 'computed', 'effect', 'input/output'] },
      { title: 'Services and DI', description: 'Share logic and API access using injectable services.', topics: ['@Injectable', 'inject', 'providers', 'HttpClient'] },
      { title: 'Forms', description: 'Collect and validate user data predictably.', topics: ['reactive forms', 'validators', 'form controls', 'errors'] },
      { title: 'Angular Router', description: 'Configure pages, parameters, lazy loading, and guards.', topics: ['routes', 'routerLink', 'router-outlet', 'guards'] },
    ],
    example: {
      title: 'A signal-powered counter', file: 'counter.ts', explanation: 'A standalone component holds writable state in a signal and derives a second value with computed.',
      code: `import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: \`
    <p>Count: {{ count() }}</p>
    <p>Doubled: {{ doubled() }}</p>
    <button type="button" (click)="increment()">Add one</button>
  \`,
})
export class Counter {
  readonly count = signal(0);
  readonly doubled = computed(() => this.count() * 2);

  increment() {
    this.count.update((value) => value + 1);
  }
}`,
    },
    cheatSheet: [
      { title: 'Component', items: [
        { syntax: '@Component({ ... })', meaning: 'Declare component metadata' }, { syntax: 'selector: "app-card"', meaning: 'Component HTML selector' }, { syntax: 'imports: [RouterLink]', meaning: 'Template dependencies' }, { syntax: '{{ value }}', meaning: 'Text interpolation' }, { syntax: '(click)="save()"', meaning: 'Event binding' },
      ] },
      { title: 'Signals and DI', items: [
        { syntax: 'signal(0)', meaning: 'Writable reactive state' }, { syntax: 'count()', meaning: 'Read a signal' }, { syntax: 'count.set(2)', meaning: 'Replace signal value' }, { syntax: 'computed(() => ...)', meaning: 'Derived signal' }, { syntax: 'inject(UserService)', meaning: 'Request a dependency' },
      ] },
      { title: 'Router and forms', items: [
        { syntax: 'provideRouter(routes)', meaning: 'Register application routes' }, { syntax: '<a routerLink="/users">', meaning: 'Client-side link' }, { syntax: '<router-outlet />', meaning: 'Render matched route' }, { syntax: 'new FormControl("")', meaning: 'Reactive form control' }, { syntax: 'Validators.required', meaning: 'Required validation rule' },
      ] },
    ],
    quiz: [
      { question: 'How do you read an Angular signal?', options: ['count.value', 'count()', 'this.count.value', 'get(count)'], correct: 1, explanation: 'Angular signals are getter functions, so you read them by calling them.' },
      { question: 'Where does a routed component render?', options: ['<router-outlet>', '<route-view>', '<main-route>', '<ng-page>'], correct: 0, explanation: 'router-outlet is the placeholder Angular uses for the active route.' },
      { question: 'What is the purpose of dependency injection?', options: ['Compile CSS', 'Supply reusable dependencies', 'Create HTML tags', 'Replace TypeScript'], correct: 1, explanation: 'Angular’s injector creates and supplies services or other registered dependencies.' },
    ],
    project: { title: 'Internship board', description: 'Build a routed Angular app for browsing and saving internship opportunities.', requirements: ['Standalone components', 'Signals', 'Injectable HTTP service', 'Reactive form', 'Routes and guard'] },
  },
  {
    slug: 'nestjs',
    title: 'NestJS',
    eyebrow: 'Structured Node.js backend',
    category: 'Backend',
    level: 'Beginner to intermediate',
    accent: '#e0234e',
    softAccent: '#fff0f3',
    tagline: 'Understand the backend from request to response.',
    description: 'Learn modules, controllers, providers, dependency injection, DTO validation, databases, authentication, guards, interceptors, errors, and testing.',
    duration: '12–16 hours',
    prerequisites: ['JavaScript', 'TypeScript basics', 'HTTP basics'],
    officialUrl: 'https://docs.nestjs.com/',
    lessons: [
      { title: 'Project structure', description: 'Organize backend code by domain feature.', topics: ['main', 'root module', 'feature modules', 'common'] },
      { title: 'Controllers and HTTP', description: 'Map routes to small request handlers.', topics: ['decorators', 'params', 'body', 'status codes'] },
      { title: 'Providers and DI', description: 'Keep business logic reusable and testable.', topics: ['services', 'providers', 'constructor injection', 'exports'] },
      { title: 'DTOs and validation', description: 'Reject unsafe input before business logic runs.', topics: ['DTO classes', 'ValidationPipe', 'transform', 'whitelist'] },
      { title: 'Data and security', description: 'Persist data and protect actions by identity and permission.', topics: ['ORM', 'migrations', 'JWT', 'guards'] },
      { title: 'Testing and production', description: 'Verify behavior and operate the API safely.', topics: ['unit', 'E2E', 'configuration', 'health'] },
    ],
    example: { title: 'Tasks controller', file: 'tasks.controller.ts', explanation: 'The detailed course contains a complete four-file feature example.', code: `@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }
}` },
    cheatSheet: [
      { title: 'CLI and structure', items: [
        { syntax: 'nest new app --strict', meaning: 'Create a strict project' }, { syntax: 'nest g module tasks', meaning: 'Generate a module' }, { syntax: 'nest g controller tasks', meaning: 'Generate a controller' }, { syntax: 'nest g service tasks', meaning: 'Generate a service' }, { syntax: 'npm run start:dev', meaning: 'Run in watch mode' },
      ] },
      { title: 'HTTP and DI', items: [
        { syntax: '@Controller("tasks")', meaning: 'Route prefix' }, { syntax: '@Get(":id")', meaning: 'GET route with parameter' }, { syntax: '@Body() input: Dto', meaning: 'Read typed request body' }, { syntax: '@Injectable()', meaning: 'Mark an injectable provider' }, { syntax: 'constructor(private service: Service)', meaning: 'Constructor injection' },
      ] },
      { title: 'Safety and errors', items: [
        { syntax: 'new ValidationPipe({ whitelist: true })', meaning: 'Validate and strip unknown fields' }, { syntax: '@UseGuards(AuthGuard)', meaning: 'Protect a route' }, { syntax: 'throw new NotFoundException()', meaning: 'Return HTTP 404' }, { syntax: '@UseInterceptors(...)', meaning: 'Wrap route execution' }, { syntax: 'Test.createTestingModule(...)', meaning: 'Create a Nest test module' },
      ] },
    ],
    quiz: [
      { question: 'Where should business rules live?', options: ['Controller', 'Service/provider', 'main.ts', 'DTO only'], correct: 1, explanation: 'Providers such as services keep business logic reusable and testable.' },
      { question: 'What connects controllers and providers?', options: ['CSS', 'Module metadata', 'A browser event', 'A migration'], correct: 1, explanation: 'A module registers controllers and providers and defines imports and exports.' },
      { question: 'What validates a DTO before a controller handler?', options: ['A pipe', 'A footer', 'A repository', 'A template'], correct: 0, explanation: 'ValidationPipe reads DTO metadata and rejects invalid request data.' },
    ],
    project: { title: 'Production tasks API', description: 'Build an authenticated Tasks API with persistent data and verified HTTP behavior.', requirements: ['Feature module', 'Validated CRUD routes', 'Database migrations', 'JWT and authorization', 'Unit and E2E tests'] },
  },
  {
    slug: 'java',
    title: 'Java',
    eyebrow: 'Strongly typed programming',
    category: 'Language',
    level: 'Beginner to intermediate',
    accent: '#d16b26',
    softAccent: '#fff2e8',
    tagline: 'Build reliable programs with clear types and objects.',
    description: 'Learn variables, primitive types, control flow, methods, classes, objects, interfaces, collections, generics, exceptions, streams, files, and testing.',
    duration: '16–20 hours',
    prerequisites: ['No Java experience required'],
    officialUrl: 'https://dev.java/learn/',
    lessons: [
      { title: 'Program anatomy', description: 'Compile and run classes with a main entry point.', topics: ['JDK', 'class', 'main', 'packages'] },
      { title: 'Variables and flow', description: 'Use primitive types, operators, decisions, and loops.', topics: ['int', 'double', 'boolean', 'if', 'switch', 'for'] },
      { title: 'Methods', description: 'Create reusable operations with typed input and output.', topics: ['parameters', 'return', 'overloading', 'scope'] },
      { title: 'Classes and objects', description: 'Model data and behavior with encapsulation.', topics: ['fields', 'constructors', 'methods', 'records'] },
      { title: 'Collections and generics', description: 'Work safely with lists, sets, and maps.', topics: ['List', 'Set', 'Map', 'generics', 'streams'] },
      { title: 'Errors and testing', description: 'Handle expected failures and verify behavior.', topics: ['exceptions', 'try/catch', 'JUnit', 'files'] },
    ],
    example: {
      title: 'A small task model', file: 'Task.java', explanation: 'The record stores immutable data while the method expresses a business-friendly calculation.',
      code: `public record Task(String title, Priority priority, boolean done) {
  public Task {
    if (title == null || title.isBlank()) {
      throw new IllegalArgumentException("Title is required");
    }
  }

  public String status() {
    return done ? "Complete" : "Open";
  }
}

enum Priority {
  LOW, MEDIUM, HIGH
}`,
    },
    cheatSheet: [
      { title: 'Types and flow', items: [
        { syntax: 'int count = 0;', meaning: 'Integer variable' }, { syntax: 'var name = "Ana";', meaning: 'Local type inference' }, { syntax: 'if (ready) { ... }', meaning: 'Conditional block' }, { syntax: 'for (var item : items)', meaning: 'Enhanced for loop' }, { syntax: 'switch (status) { ... }', meaning: 'Branch by value' },
      ] },
      { title: 'Objects', items: [
        { syntax: 'class User { ... }', meaning: 'Class declaration' }, { syntax: 'new User("Ana")', meaning: 'Create an object' }, { syntax: 'public String name()', meaning: 'Public method returning String' }, { syntax: 'record User(String name) {}', meaning: 'Compact immutable data carrier' }, { syntax: 'implements Comparable<User>', meaning: 'Implement an interface' },
      ] },
      { title: 'Collections and errors', items: [
        { syntax: 'List<String> names', meaning: 'Ordered generic list' }, { syntax: 'Map<Long, User> users', meaning: 'Key/value collection' }, { syntax: 'items.stream().filter(...)', meaning: 'Collection pipeline' }, { syntax: 'try { ... } catch (Exception e)', meaning: 'Handle an exception' }, { syntax: 'Optional<User>', meaning: 'Possibly absent value' },
      ] },
    ],
    quiz: [
      { question: 'Which collection stores key/value pairs?', options: ['List', 'Set', 'Map', 'Queue only'], correct: 2, explanation: 'Map associates unique keys with values.' },
      { question: 'What is a constructor used for?', options: ['Import a package', 'Initialize a new object', 'Catch exceptions', 'Start every loop'], correct: 1, explanation: 'A constructor initializes state when an object is created.' },
      { question: 'What does a generic type such as List<String> provide?', options: ['CSS styling', 'Compile-time element type safety', 'Automatic database storage', 'Faster internet'], correct: 1, explanation: 'Generics tell the compiler which element type the collection accepts and returns.' },
    ],
    project: { title: 'Library manager', description: 'Build a console application for books, members, and loans.', requirements: ['Classes or records', 'Collections and generics', 'Validated methods', 'Exception handling', 'JUnit tests'] },
  },
]

export const coursesBySlug = Object.fromEntries(courses.map((course) => [course.slug, course])) as Record<string, CourseDefinition>

export const recommendedPath = ['html', 'css', 'javascript', 'vue', 'angular', 'nestjs']
