<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Box,
  Braces,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Clipboard,
  Code2,
  Database,
  FileCode2,
  FileText,
  FolderTree,
  KeyRound,
  Layers3,
  Lightbulb,
  Network,
  Route,
  ServerCog,
  ShieldCheck,
  Sparkles,
  TestTube2,
  Terminal,
  Workflow,
  X,
} from 'lucide-vue-next'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import { coursesBySlug } from '../data/learning'

type ExampleKey = 'controller' | 'service' | 'module' | 'dto'

const activeExample = ref<ExampleKey>('controller')
const copiedExample = ref<ExampleKey | null>(null)
const selectedAnswers = ref<Record<number, number>>({})
const completedSteps = ref<number[]>([])
const nestCourse = coursesBySlug.nestjs

const mentalModels = [
  {
    title: 'Module',
    analogy: 'The labeled box',
    text: 'Groups one feature and tells Nest which controllers and providers belong together.',
    icon: Box,
  },
  {
    title: 'Controller',
    analogy: 'The receptionist',
    text: 'Receives HTTP requests, reads their data, and returns an HTTP response.',
    icon: Route,
  },
  {
    title: 'Service',
    analogy: 'The specialist',
    text: 'Contains reusable business logic and talks to databases or other services.',
    icon: ServerCog,
  },
  {
    title: 'DTO',
    analogy: 'The input checklist',
    text: 'Describes and validates the exact shape of data that may enter your application.',
    icon: Clipboard,
  },
]

const requestFlow = [
  { name: 'Client', detail: 'Sends POST /tasks', icon: Network },
  { name: 'Middleware', detail: 'Runs shared request work', icon: Layers3 },
  { name: 'Guard', detail: 'Checks permission', icon: ShieldCheck },
  { name: 'Pipe', detail: 'Validates and transforms', icon: Braces },
  { name: 'Controller', detail: 'Chooses the handler', icon: Route },
  { name: 'Service', detail: 'Runs business logic', icon: ServerCog },
  { name: 'Response', detail: 'Returns JSON + status', icon: CheckCircle2 },
]

const examples: Record<ExampleKey, { label: string; file: string; explanation: string; code: string }> = {
  controller: {
    label: 'Controller',
    file: 'tasks.controller.ts',
    explanation: 'Routes stay small. They translate HTTP input into a service call.',
    code: `import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Post()
  create(@Body() input: CreateTaskDto) {
    return this.tasksService.create(input);
  }
}`,
  },
  service: {
    label: 'Service',
    file: 'tasks.service.ts',
    explanation: 'The service owns the feature logic and can be reused by more than one controller.',
    code: `import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private readonly tasks: CreateTaskDto[] = [];

  findAll(): CreateTaskDto[] {
    return this.tasks;
  }

  create(input: CreateTaskDto): CreateTaskDto {
    this.tasks.push(input);
    return input;
  }
}`,
  },
  module: {
    label: 'Module',
    file: 'tasks.module.ts',
    explanation: 'The module connects the controller and service so Nest can create and inject them.',
    code: `import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}`,
  },
  dto: {
    label: 'DTO',
    file: 'dto/create-task.dto.ts',
    explanation: 'A DTO is a class at runtime, so validation decorators can inspect incoming data.',
    code: `import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsIn(['low', 'medium', 'high'])
  priority: 'low' | 'medium' | 'high';
}`,
  },
}

const foundations = [
  { term: 'Variable', code: `const port: number = 3000;`, meaning: 'A named place that stores a value. Prefer const; use let only when the value changes.' },
  { term: 'Function', code: `function add(a: number, b: number): number`, meaning: 'A reusable action. Parameters are input; the return value is output.' },
  { term: 'Class', code: `class TasksService { ... }`, meaning: 'A blueprint that groups data and methods. Most Nest building blocks are classes.' },
  { term: 'Method', code: `findAll() { ... }`, meaning: 'A function that belongs to a class.' },
  { term: 'Decorator', code: `@Controller('tasks')`, meaning: 'Metadata that tells Nest what a class or method should do.' },
  { term: 'Type / Interface', code: `type Role = 'user' | 'admin'`, meaning: 'A TypeScript rule that catches mistakes before the application runs.' },
]

const httpRows = [
  { method: 'GET', route: '/tasks', job: 'Read all tasks', success: '200 OK' },
  { method: 'GET', route: '/tasks/:id', job: 'Read one task', success: '200 OK / 404' },
  { method: 'POST', route: '/tasks', job: 'Create a task', success: '201 Created' },
  { method: 'PATCH', route: '/tasks/:id', job: 'Update part of a task', success: '200 OK' },
  { method: 'DELETE', route: '/tasks/:id', job: 'Delete a task', success: '204 No Content' },
]

const importantTools = [
  { title: 'Pipes', text: 'Validate or transform input before your controller method runs.', example: 'ValidationPipe, ParseIntPipe', icon: Braces },
  { title: 'Guards', text: 'Decide whether this request is allowed to continue.', example: 'JWT auth, roles, permissions', icon: ShieldCheck },
  { title: 'Interceptors', text: 'Wrap execution to transform responses, log timing, or cache.', example: 'Response mapping, timeout', icon: Workflow },
  { title: 'Exception filters', text: 'Catch errors and control the final error response shape.', example: 'Global error formatting', icon: CircleDot },
  { title: 'Middleware', text: 'Run general work before the route handler is selected.', example: 'Request ID, basic logging', icon: Layers3 },
  { title: 'Custom decorators', text: 'Reuse request metadata with a clear, readable API.', example: '@CurrentUser()', icon: Sparkles },
]

const productionPillars = [
  {
    title: 'Database',
    icon: Database,
    summary: 'Keep queries behind a repository or service. Use migrations and transactions for multi-step writes.',
    checklist: ['Validate IDs before querying', 'Handle not-found records', 'Never expose database models blindly'],
  },
  {
    title: 'Security',
    icon: KeyRound,
    summary: 'Hash passwords, verify tokens in guards, authorize each protected action, and keep secrets in environment variables.',
    checklist: ['Authentication answers “who?”', 'Authorization answers “may they?”', 'Rate-limit sensitive endpoints'],
  },
  {
    title: 'Testing',
    icon: TestTube2,
    summary: 'Unit-test business rules and integration/E2E-test the real HTTP contract with a test database.',
    checklist: ['Mock dependencies in unit tests', 'Test success and failure paths', 'Never claim E2E from unit tests alone'],
  },
]

const mistakes = [
  ['Fat controllers', 'Move decisions and database work into a service. Controllers should coordinate HTTP only.'],
  ['Missing provider error', 'Register the service in providers, export it, and import its module where needed.'],
  ['Trusting request data', 'Use a global validation pipe with whitelist and forbidNonWhitelisted settings.'],
  ['One giant AppModule', 'Create a feature module for each domain: users, auth, tasks, notifications.'],
  ['Returning every field', 'Map entities to response objects; never return password hashes or internal secrets.'],
  ['Catching every error', 'Throw meaningful Nest HTTP exceptions and centralize unexpected-error handling.'],
]

const questions = [
  {
    question: 'Which file should contain the rule “a completed task cannot be edited”?',
    options: ['Controller', 'Service', 'DTO', 'main.ts'],
    correct: 1,
    explanation: 'It is business logic, so the service owns it. The controller only translates HTTP input and output.',
  },
  {
    question: 'What does dependency injection do?',
    options: ['Creates database tables', 'Writes CSS', 'Provides required class instances', 'Validates every password'],
    correct: 2,
    explanation: 'Nest creates registered providers and supplies them through constructors, keeping classes loosely coupled and testable.',
  },
  {
    question: 'Which building block should reject an invalid request body?',
    options: ['Validation pipe + DTO', 'Interceptor only', 'Footer component', 'Database migration'],
    correct: 0,
    explanation: 'A validation pipe checks the DTO before invalid input reaches your controller logic.',
  },
]

const roadmap = [
  'Create and run a new Nest project',
  'Build one feature module',
  'Create CRUD controller routes',
  'Move business logic into a service',
  'Add DTO validation and useful errors',
  'Connect a database with migrations',
  'Add JWT authentication and role guards',
  'Write unit and HTTP E2E tests',
]

const activeCode = computed(() => examples[activeExample.value])
const quizScore = computed(() =>
  questions.reduce((score, question, index) => score + (selectedAnswers.value[index] === question.correct ? 1 : 0), 0),
)

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(activeCode.value.code)
    copiedExample.value = activeExample.value
    window.setTimeout(() => (copiedExample.value = null), 1800)
  } catch {
    copiedExample.value = null
  }
}

const toggleStep = (index: number) => {
  completedSteps.value = completedSteps.value.includes(index)
    ? completedSteps.value.filter((step) => step !== index)
    : [...completedSteps.value, index]
}

</script>

<template>
  <DefaultLayout>
    <div class="nest-page">
      <section id="nest-top" class="nest-hero">
        <div class="nest-grid" aria-hidden="true"></div>
        <div class="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-36 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-28 lg:pt-44">
          <RouterLink to="/learn" class="nest-back lg:col-span-2"><ArrowLeft :size="15" /> All courses</RouterLink>
          <div class="relative z-10">
            <p class="nest-eyebrow"><BookOpen :size="14" /> Beginner learning path · NestJS</p>
            <h1>Understand NestJS <span>from request to response.</span></h1>
            <p class="nest-lead">
              Learn the structure, components, variables, functions, and patterns that matter—using one small Tasks API and plain-language explanations.
            </p>
            <div class="nest-hero-actions">
              <a href="#mental-model" class="nest-primary">Start learning <ArrowRight :size="17" /></a>
              <a href="#roadmap" class="nest-secondary">View roadmap</a>
            </div>
            <dl class="nest-stats">
              <div><dt>11</dt><dd>core topics</dd></div>
              <div><dt>30 min</dt><dd>first read</dd></div>
              <div><dt>1 API</dt><dd>shared example</dd></div>
            </dl>
          </div>

          <div class="terminal-card" aria-label="Commands to create a NestJS project">
            <div class="terminal-top"><span></span><span></span><span></span><small>terminal</small></div>
            <div class="terminal-body">
              <p><i>$</i> npm i -g @nestjs/cli</p>
              <p><i>$</i> nest new tasks-api --strict</p>
              <p><i>$</i> cd tasks-api</p>
              <p><i>$</i> npm run start:dev</p>
              <div class="terminal-result"><CheckCircle2 :size="16" /> API ready on localhost:3000</div>
            </div>
          </div>
        </div>
      </section>

      <div class="learn-layout mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <aside class="learn-sidebar" aria-label="NestJS lesson sections">
          <p>On this page</p>
          <nav>
            <a href="#mental-model">01 · Mental model</a>
            <a href="#structure">02 · Project structure</a>
            <a href="#request-flow">03 · Request lifecycle</a>
            <a href="#building-blocks">04 · Working code</a>
            <a href="#typescript">05 · TypeScript basics</a>
            <a href="#http">06 · HTTP and CRUD</a>
            <a href="#nest-tools">07 · Nest tools</a>
            <a href="#production">08 · Production basics</a>
            <a href="#cheat-sheet">09 · Cheat sheet</a>
            <a href="#quiz">10 · Knowledge check</a>
            <a href="#roadmap">11 · Learning roadmap</a>
          </nav>
          <a class="docs-link" href="https://docs.nestjs.com/" target="_blank" rel="noopener noreferrer">
            Official NestJS docs <ChevronRight :size="14" />
          </a>
        </aside>

        <div class="lesson-content">
          <section id="mental-model" class="lesson-section">
            <p class="lesson-number">01 · Start here</p>
            <h2>One simple mental model</h2>
            <p class="lesson-intro">
              NestJS is a Node.js backend framework built around TypeScript classes. You organize code by feature, then Nest connects those classes for you.
            </p>
            <div class="model-grid">
              <article v-for="item in mentalModels" :key="item.title" class="model-card">
                <span><component :is="item.icon" :size="21" /></span>
                <small>{{ item.analogy }}</small>
                <h3>{{ item.title }}</h3>
                <p>{{ item.text }}</p>
              </article>
            </div>
            <div class="remember-box"><Lightbulb :size="20" /><p><strong>Remember:</strong> request enters a controller → controller calls a service → service returns data → controller sends the response.</p></div>
          </section>

          <section id="structure" class="lesson-section">
            <p class="lesson-number">02 · Project structure</p>
            <h2>Organize by feature</h2>
            <p class="lesson-intro">Put everything about a feature together. A new developer should be able to find “tasks” without searching the whole project.</p>
            <div class="structure-grid">
              <div class="file-tree">
                <div class="code-heading"><span><FolderTree :size="16" /> Folder tree</span><small>tasks-api/</small></div>
                <pre><code>src/
├── main.ts
├── app.module.ts
├── tasks/
│   ├── dto/
│   │   ├── create-task.dto.ts
│   │   └── update-task.dto.ts
│   ├── tasks.controller.ts
│   ├── tasks.service.ts
│   └── tasks.module.ts
├── auth/
│   ├── guards/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
└── common/
    ├── filters/
    ├── interceptors/
    └── decorators/</code></pre>
              </div>
              <div class="file-explanations">
                <article><code>main.ts</code><p>Boots the application. Put global prefix, pipes, CORS, and shutdown setup here.</p></article>
                <article><code>app.module.ts</code><p>The root module. It imports feature modules; it should not contain every feature itself.</p></article>
                <article><code>*.module.ts</code><p>Defines the feature boundary and registers controllers and providers.</p></article>
                <article><code>*.controller.ts</code><p>Maps URLs and HTTP methods to small handler methods.</p></article>
                <article><code>*.service.ts</code><p>Owns business rules and coordinates storage or external APIs.</p></article>
                <article><code>dto/*.dto.ts</code><p>Defines safe request shapes for create, update, query, and response data.</p></article>
              </div>
            </div>
          </section>

          <section id="request-flow" class="lesson-section">
            <p class="lesson-number">03 · Request lifecycle</p>
            <h2>What runs when a request arrives?</h2>
            <p class="lesson-intro">Read this left to right. Most bugs become easier once you know which layer should be responsible.</p>
            <div class="request-flow">
              <template v-for="(step, index) in requestFlow" :key="step.name">
                <article>
                  <span><component :is="step.icon" :size="18" /></span>
                  <strong>{{ step.name }}</strong>
                  <small>{{ step.detail }}</small>
                </article>
                <ChevronRight v-if="index < requestFlow.length - 1" class="flow-arrow" :size="18" aria-hidden="true" />
              </template>
            </div>
            <div class="flow-note">
              <strong>More exact order:</strong>
              <span>middleware → guards → interceptors (before) → pipes → controller → service → interceptors (after) → exception filters if an uncaught error occurs.</span>
            </div>
          </section>

          <section id="building-blocks" class="lesson-section">
            <p class="lesson-number">04 · Working code</p>
            <h2>Four files create one feature</h2>
            <p class="lesson-intro">Switch between the tabs. Notice how each file has one clear responsibility.</p>
            <div class="code-workbench">
              <div class="code-tabs" role="tablist" aria-label="NestJS code examples">
                <button
                  v-for="(example, key) in examples"
                  :key="key"
                  type="button"
                  role="tab"
                  :aria-selected="activeExample === key"
                  :class="{ active: activeExample === key }"
                  @click="activeExample = key as ExampleKey"
                >{{ example.label }}</button>
              </div>
              <div class="code-description">
                <div><FileCode2 :size="17" /><strong>{{ activeCode.file }}</strong></div>
                <p>{{ activeCode.explanation }}</p>
              </div>
              <div class="code-panel">
                <button type="button" class="copy-code" :aria-label="`Copy ${activeCode.label} example`" @click="copyCode">
                  <Check v-if="copiedExample === activeExample" :size="15" />
                  <Code2 v-else :size="15" />
                  {{ copiedExample === activeExample ? 'Copied' : 'Copy' }}
                </button>
                <pre><code>{{ activeCode.code }}</code></pre>
              </div>
            </div>
            <div class="di-card">
              <div class="di-icon"><Sparkles :size="23" /></div>
              <div><h3>Dependency injection, without the mystery</h3><p>You ask for <code>TasksService</code> in the controller constructor. Nest sees it registered in the module, creates the service, and gives that instance to the controller. Your controller does not use <code>new TasksService()</code>, which makes replacement and testing much easier.</p></div>
            </div>
          </section>

          <section id="typescript" class="lesson-section">
            <p class="lesson-number">05 · TypeScript foundations</p>
            <h2>Variables, functions, classes, and types</h2>
            <p class="lesson-intro">NestJS becomes much easier when these six words feel familiar.</p>
            <div class="foundation-list">
              <article v-for="item in foundations" :key="item.term">
                <h3>{{ item.term }}</h3>
                <code>{{ item.code }}</code>
                <p>{{ item.meaning }}</p>
              </article>
            </div>
            <div class="plain-code">
              <div class="code-heading"><span><Braces :size="16" /> Read this line slowly</span><small>TypeScript</small></div>
              <pre><code>constructor(private readonly tasksService: TasksService) {}</code></pre>
              <ol>
                <li><strong>constructor</strong> runs when Nest creates the controller.</li>
                <li><strong>private</strong> makes the variable usable only inside this class.</li>
                <li><strong>readonly</strong> means the variable cannot be reassigned later.</li>
                <li><strong>tasksService</strong> is the variable name.</li>
                <li><strong>TasksService</strong> is its type and the dependency Nest must provide.</li>
              </ol>
            </div>
          </section>

          <section id="http" class="lesson-section">
            <p class="lesson-number">06 · HTTP and CRUD</p>
            <h2>Turn business actions into routes</h2>
            <p class="lesson-intro">A predictable API uses HTTP methods consistently and returns useful status codes.</p>
            <div class="http-table-wrap">
              <table class="http-table">
                <thead><tr><th>Method</th><th>Route</th><th>Purpose</th><th>Typical success</th></tr></thead>
                <tbody>
                  <tr v-for="row in httpRows" :key="`${row.method}-${row.route}`">
                    <td><span :class="`method-${row.method.toLowerCase()}`">{{ row.method }}</span></td>
                    <td><code>{{ row.route }}</code></td>
                    <td>{{ row.job }}</td>
                    <td>{{ row.success }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="status-grid">
              <div><strong>200</strong><span>Request succeeded</span></div>
              <div><strong>201</strong><span>Resource created</span></div>
              <div><strong>400</strong><span>Input is invalid</span></div>
              <div><strong>401</strong><span>Not authenticated</span></div>
              <div><strong>403</strong><span>Not allowed</span></div>
              <div><strong>404</strong><span>Resource not found</span></div>
            </div>
          </section>

          <section id="nest-tools" class="lesson-section">
            <p class="lesson-number">07 · Important Nest tools</p>
            <h2>Give every concern the right home</h2>
            <div class="tool-grid">
              <article v-for="tool in importantTools" :key="tool.title">
                <span><component :is="tool.icon" :size="20" /></span>
                <h3>{{ tool.title }}</h3>
                <p>{{ tool.text }}</p>
                <small>{{ tool.example }}</small>
              </article>
            </div>
          </section>

          <section id="production" class="lesson-section">
            <p class="lesson-number">08 · Production basics</p>
            <h2>Database, security, and testing</h2>
            <div class="pillar-grid">
              <article v-for="pillar in productionPillars" :key="pillar.title">
                <span><component :is="pillar.icon" :size="22" /></span>
                <h3>{{ pillar.title }}</h3>
                <p>{{ pillar.summary }}</p>
                <ul><li v-for="item in pillar.checklist" :key="item"><Check :size="14" />{{ item }}</li></ul>
              </article>
            </div>
            <div class="mistakes-card">
              <div class="mistakes-heading"><X :size="20" /><div><h3>Common beginner mistakes</h3><p>Use these symptoms to find the right fix quickly.</p></div></div>
              <dl>
                <div v-for="mistake in mistakes" :key="mistake[0]"><dt>{{ mistake[0] }}</dt><dd>{{ mistake[1] }}</dd></div>
              </dl>
            </div>
          </section>

          <section id="cheat-sheet" class="lesson-section">
            <p class="lesson-number">09 · Quick reference</p>
            <div class="nest-cheat-heading">
              <div><h2>NestJS cheat sheet</h2><p class="lesson-intro">Keep the most useful commands, decorators, validation, security, and testing syntax close while you build.</p></div>
              <span><FileText :size="18" /> 15 essentials</span>
            </div>
            <div class="nest-cheat-grid">
              <article v-for="group in nestCourse.cheatSheet" :key="group.title">
                <h3>{{ group.title }}</h3>
                <dl><div v-for="item in group.items" :key="item.syntax"><dt><code>{{ item.syntax }}</code></dt><dd>{{ item.meaning }}</dd></div></dl>
              </article>
            </div>
            <div class="cheat-reminder"><Sparkles :size="18" /><p>Use this sheet to remember syntax. Return to the lessons when you need to understand responsibility, order, or design decisions.</p></div>
          </section>

          <section id="quiz" class="lesson-section">
            <p class="lesson-number">10 · Knowledge check</p>
            <div class="quiz-heading"><div><h2>Check your understanding</h2><p class="lesson-intro">Choose one answer. Feedback appears immediately.</p></div><div class="score-badge"><strong>{{ quizScore }}/{{ questions.length }}</strong><span>correct</span></div></div>
            <div class="quiz-list">
              <fieldset v-for="(question, questionIndex) in questions" :key="question.question">
                <legend><span>{{ questionIndex + 1 }}</span>{{ question.question }}</legend>
                <div class="answer-grid">
                  <button
                    v-for="(option, optionIndex) in question.options"
                    :key="option"
                    type="button"
                    :class="{
                      selected: selectedAnswers[questionIndex] === optionIndex,
                      correct: selectedAnswers[questionIndex] !== undefined && optionIndex === question.correct,
                      wrong: selectedAnswers[questionIndex] === optionIndex && optionIndex !== question.correct,
                    }"
                    @click="selectedAnswers[questionIndex] = optionIndex"
                  >{{ option }}</button>
                </div>
                <p v-if="selectedAnswers[questionIndex] !== undefined" class="answer-feedback" aria-live="polite">
                  <CheckCircle2 v-if="selectedAnswers[questionIndex] === question.correct" :size="16" />
                  <Lightbulb v-else :size="16" />
                  {{ question.explanation }}
                </p>
              </fieldset>
            </div>
          </section>

          <section id="roadmap" class="lesson-section roadmap-section">
            <p class="lesson-number">11 · Your roadmap</p>
            <h2>Learn in this order</h2>
            <p class="lesson-intro">Click each step as you finish it. Build one small Tasks API all the way through before starting a large project.</p>
            <div class="progress-track"><span :style="{ width: `${(completedSteps.length / roadmap.length) * 100}%` }"></span></div>
            <p class="progress-label">{{ completedSteps.length }} of {{ roadmap.length }} completed</p>
            <div class="roadmap-list">
              <button
                v-for="(step, index) in roadmap"
                :key="step"
                type="button"
                :class="{ complete: completedSteps.includes(index) }"
                :aria-pressed="completedSteps.includes(index)"
                @click="toggleStep(index)"
              >
                <span><Check v-if="completedSteps.includes(index)" :size="16" /><template v-else>{{ String(index + 1).padStart(2, '0') }}</template></span>
                {{ step }}
              </button>
            </div>
            <div class="next-step-card">
              <div><Terminal :size="24" /><span><small>Your next action</small><strong>Create the project and make one GET /tasks route.</strong></span></div>
              <code>nest new tasks-api --strict</code>
            </div>
          </section>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped>
.nest-page { --nest-red: #e0234e; --nest-red-soft: color-mix(in srgb, var(--nest-red) 10%, var(--surface)); }
.nest-hero { position: relative; overflow: hidden; border-bottom: 1px solid var(--border); background: var(--surface); }
.nest-grid { position: absolute; inset: 0; opacity: 0.48; background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px); background-size: 38px 38px; mask-image: linear-gradient(to bottom right, black, transparent 72%); }
.nest-hero::after { position: absolute; width: 34rem; height: 34rem; right: -16rem; top: -17rem; border: 1px solid color-mix(in srgb, var(--nest-red) 24%, transparent); border-radius: 999px; box-shadow: 0 0 0 5rem color-mix(in srgb, var(--nest-red) 3%, transparent); content: ''; }
.nest-eyebrow { display: inline-flex; align-items: center; gap: 0.45rem; padding: 0.48rem 0.7rem; border: 1px solid color-mix(in srgb, var(--nest-red) 25%, var(--border)); border-radius: 999px; background: var(--nest-red-soft); color: var(--nest-red); font-size: 0.68rem; font-weight: 850; letter-spacing: 0.08em; text-transform: uppercase; }
.nest-hero h1 { max-width: 52rem; margin-top: 1.25rem; font-size: clamp(3rem, 7vw, 6rem); font-weight: 850; letter-spacing: -0.07em; line-height: 0.95; }
.nest-hero h1 span { display: block; color: var(--nest-red); }
.nest-lead { max-width: 44rem; margin-top: 1.5rem; color: var(--text-secondary); font-size: clamp(1rem, 1.6vw, 1.14rem); line-height: 1.8; }
.nest-hero-actions { display: flex; flex-wrap: wrap; gap: 0.65rem; margin-top: 1.8rem; }
.nest-primary, .nest-secondary { display: inline-flex; min-height: 3.1rem; align-items: center; justify-content: center; gap: 0.45rem; padding: 0.8rem 1.1rem; border-radius: 0.78rem; font-size: 0.78rem; font-weight: 850; text-decoration: none; transition: transform 0.2s ease; }
.nest-primary { background: var(--nest-red); color: white; box-shadow: 0 12px 28px color-mix(in srgb, var(--nest-red) 22%, transparent); }
.nest-secondary { border: 1px solid var(--border); background: var(--surface); color: var(--text-primary); }
.nest-primary:hover, .nest-secondary:hover { transform: translateY(-2px); }
.nest-stats { display: flex; gap: 0; margin-top: 2.4rem; }
.nest-stats div { min-width: 7rem; padding: 0 1rem; border-right: 1px solid var(--border); }
.nest-stats div:first-child { padding-left: 0; }
.nest-stats div:last-child { border: 0; }
.nest-stats dt { font-size: 1rem; font-weight: 850; }
.nest-stats dd { margin-top: 0.15rem; color: var(--text-muted); font-size: 0.6rem; font-weight: 750; text-transform: uppercase; }
.terminal-card { position: relative; z-index: 2; overflow: hidden; border: 1px solid #343b4f; border-radius: 1.1rem; background: #0c101b; box-shadow: 0 30px 80px rgb(10 14 30 / 0.25); transform: rotate(1deg); }
.terminal-top { display: flex; align-items: center; gap: 0.35rem; height: 2.8rem; padding: 0 1rem; border-bottom: 1px solid #272e40; background: #151a28; }
.terminal-top span { width: 0.55rem; height: 0.55rem; border-radius: 99px; background: #3d455a; }
.terminal-top span:first-child { background: #e85b66; }.terminal-top span:nth-child(2) { background: #e7b74c; }.terminal-top span:nth-child(3) { background: #55bf85; }
.terminal-top small { margin-left: auto; color: #7f899f; font-family: ui-monospace, monospace; font-size: 0.65rem; }
.terminal-body { padding: 1.5rem; color: #dce3f4; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: clamp(0.7rem, 1.4vw, 0.83rem); line-height: 2.15; }
.terminal-body i { margin-right: 0.7rem; color: #ef5577; font-style: normal; }
.terminal-result { display: flex; align-items: center; gap: 0.45rem; margin-top: 1rem; padding: 0.7rem 0.8rem; border: 1px solid #263c36; border-radius: 0.55rem; background: #12251f; color: #8ce4bd; font-size: 0.68rem; line-height: 1.4; }
.learn-layout { display: grid; gap: 4rem; }
.learn-sidebar { display: none; }
.learn-sidebar > p { color: var(--text-muted); font-size: 0.62rem; font-weight: 850; letter-spacing: 0.12em; text-transform: uppercase; }
.learn-sidebar nav { display: grid; gap: 0.15rem; margin-top: 0.8rem; }
.learn-sidebar nav a { padding: 0.5rem 0.65rem; border-left: 2px solid var(--border); color: var(--text-secondary); font-size: 0.7rem; font-weight: 700; }
.learn-sidebar nav a:hover { border-color: var(--nest-red); background: var(--nest-red-soft); color: var(--nest-red); }
.docs-link { display: flex; align-items: center; justify-content: space-between; margin-top: 1rem; padding: 0.7rem; border: 1px solid var(--border); border-radius: 0.6rem; color: var(--text-primary); font-size: 0.65rem; font-weight: 800; }
.lesson-content { min-width: 0; }
.lesson-section { padding: 0 0 6rem; scroll-margin-top: 7rem; }
.lesson-section + .lesson-section { padding-top: 6rem; border-top: 1px solid var(--border); }
.lesson-number { margin-bottom: 0.75rem; color: var(--nest-red); font-size: 0.67rem; font-weight: 850; letter-spacing: 0.14em; text-transform: uppercase; }
.lesson-section h2 { max-width: 48rem; font-size: clamp(2rem, 4.5vw, 3.6rem); font-weight: 830; letter-spacing: -0.055em; line-height: 1.05; }
.lesson-intro { max-width: 47rem; margin-top: 1rem; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.8; }
.model-grid { display: grid; gap: 0.75rem; margin-top: 2rem; }
.model-card { padding: 1.3rem; border: 1px solid var(--border); border-radius: 1rem; background: var(--surface); }
.model-card > span, .tool-grid article > span, .pillar-grid article > span { display: flex; width: 2.6rem; height: 2.6rem; align-items: center; justify-content: center; border-radius: 0.7rem; background: var(--nest-red-soft); color: var(--nest-red); }
.model-card small { display: block; margin-top: 1.4rem; color: var(--nest-red); font-size: 0.58rem; font-weight: 800; letter-spacing: 0.09em; text-transform: uppercase; }
.model-card h3 { margin-top: 0.3rem; font-size: 1.05rem; font-weight: 850; }
.model-card p, .tool-grid p, .pillar-grid p { margin-top: 0.55rem; color: var(--text-secondary); font-size: 0.75rem; line-height: 1.65; }
.remember-box { display: flex; gap: 0.75rem; margin-top: 1rem; padding: 1rem 1.1rem; border-left: 3px solid var(--nest-red); border-radius: 0 0.75rem 0.75rem 0; background: var(--nest-red-soft); color: var(--text-secondary); font-size: 0.78rem; line-height: 1.65; }
.remember-box svg { flex: 0 0 auto; color: var(--nest-red); }.remember-box strong { color: var(--text-primary); }
.structure-grid { display: grid; gap: 1rem; margin-top: 2rem; }
.file-tree, .plain-code { min-width: 0; overflow: hidden; border: 1px solid var(--border); border-radius: 1rem; background: #0d111c; color: #dbe3f5; }
.code-heading { display: flex; align-items: center; justify-content: space-between; padding: 0.8rem 1rem; border-bottom: 1px solid #283044; background: #151b29; }
.code-heading span { display: flex; align-items: center; gap: 0.5rem; font-size: 0.67rem; font-weight: 800; }.code-heading small { color: #8993a8; font-family: ui-monospace, monospace; font-size: 0.6rem; }
.file-tree pre, .code-panel pre, .plain-code pre { overflow-x: auto; padding: 1.25rem; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.7rem; line-height: 1.8; tab-size: 2; }
.file-explanations { display: grid; gap: 0.6rem; }
.file-explanations article { padding: 0.95rem 1rem; border: 1px solid var(--border); border-radius: 0.75rem; background: var(--surface); }
.file-explanations code { color: var(--nest-red); font-size: 0.7rem; font-weight: 800; }.file-explanations p { margin-top: 0.35rem; color: var(--text-secondary); font-size: 0.7rem; line-height: 1.6; }
.request-flow { display: flex; overflow-x: auto; align-items: stretch; gap: 0.4rem; margin-top: 2rem; padding-bottom: 0.5rem; }
.request-flow article { display: flex; min-width: 7.3rem; flex: 1 0 7.3rem; flex-direction: column; padding: 1rem; border: 1px solid var(--border); border-radius: 0.8rem; background: var(--surface); }
.request-flow article > span { color: var(--nest-red); }.request-flow strong { margin-top: 1rem; font-size: 0.76rem; }.request-flow small { margin-top: 0.3rem; color: var(--text-muted); font-size: 0.59rem; line-height: 1.45; }
.flow-arrow { flex: 0 0 auto; align-self: center; color: var(--text-muted); }
.flow-note { display: grid; gap: 0.35rem; margin-top: 1rem; padding: 1rem; border-radius: 0.75rem; background: var(--surface-2); font-size: 0.7rem; line-height: 1.65; }.flow-note span { color: var(--text-secondary); }
.code-workbench { overflow: hidden; margin-top: 2rem; border: 1px solid var(--border); border-radius: 1rem; background: var(--surface); }
.code-tabs { display: flex; overflow-x: auto; border-bottom: 1px solid var(--border); }.code-tabs button { padding: 0.8rem 1rem; border-bottom: 2px solid transparent; color: var(--text-muted); font-size: 0.68rem; font-weight: 800; cursor: pointer; }.code-tabs button.active { border-color: var(--nest-red); color: var(--nest-red); }
.code-description { display: grid; gap: 0.45rem; padding: 1rem; }.code-description div { display: flex; align-items: center; gap: 0.45rem; color: var(--text-primary); font-size: 0.72rem; }.code-description svg { color: var(--nest-red); }.code-description p { color: var(--text-secondary); font-size: 0.7rem; line-height: 1.6; }
.code-panel { position: relative; overflow: hidden; border-top: 1px solid #283044; background: #0d111c; color: #dbe3f5; }.code-panel pre { min-height: 24rem; padding-top: 3.3rem; }.copy-code { position: absolute; top: 0.75rem; right: 0.75rem; z-index: 1; display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.45rem 0.6rem; border: 1px solid #30394f; border-radius: 0.45rem; background: #171d2c; color: #aeb8cc; font-size: 0.59rem; font-weight: 800; cursor: pointer; }
.di-card { display: grid; gap: 1rem; margin-top: 1rem; padding: 1.2rem; border: 1px solid color-mix(in srgb, var(--nest-red) 25%, var(--border)); border-radius: 0.9rem; background: var(--nest-red-soft); }.di-icon { display: flex; width: 2.8rem; height: 2.8rem; align-items: center; justify-content: center; border-radius: 0.7rem; background: var(--nest-red); color: white; }.di-card h3 { font-size: 0.95rem; font-weight: 850; }.di-card p { margin-top: 0.4rem; color: var(--text-secondary); font-size: 0.74rem; line-height: 1.7; }.di-card code { color: var(--nest-red); font-weight: 800; }
.foundation-list { display: grid; gap: 0; margin-top: 2rem; border-top: 1px solid var(--border); }.foundation-list article { display: grid; gap: 0.55rem; padding: 1rem 0; border-bottom: 1px solid var(--border); }.foundation-list h3 { font-size: 0.8rem; font-weight: 850; }.foundation-list code { width: fit-content; max-width: 100%; overflow-wrap: anywhere; padding: 0.35rem 0.5rem; border-radius: 0.4rem; background: var(--nest-red-soft); color: var(--nest-red); font-size: 0.66rem; }.foundation-list p { color: var(--text-secondary); font-size: 0.7rem; line-height: 1.6; }
.plain-code { margin-top: 1.5rem; }.plain-code ol { padding: 0 1.3rem 1.3rem 2.7rem; color: #aeb8cc; font-size: 0.68rem; line-height: 1.8; list-style: decimal; }.plain-code strong { color: white; }
.http-table-wrap { overflow-x: auto; margin-top: 2rem; border: 1px solid var(--border); border-radius: 0.9rem; }.http-table { width: 100%; min-width: 42rem; border-collapse: collapse; font-size: 0.7rem; }.http-table th { padding: 0.75rem 1rem; background: var(--surface-2); color: var(--text-muted); font-size: 0.58rem; letter-spacing: 0.08em; text-align: left; text-transform: uppercase; }.http-table td { padding: 0.85rem 1rem; border-top: 1px solid var(--border); color: var(--text-secondary); }.http-table code { color: var(--text-primary); font-weight: 700; }.http-table td > span { padding: 0.3rem 0.45rem; border-radius: 0.35rem; font-size: 0.58rem; font-weight: 900; }.method-get { background: #e5f5ff; color: #0875aa; }.method-post { background: #e8f8ee; color: #168347; }.method-patch { background: #fff4df; color: #a66500; }.method-delete { background: #ffe9ee; color: #b52246; }
.status-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.55rem; margin-top: 1rem; }.status-grid div { padding: 0.8rem; border: 1px solid var(--border); border-radius: 0.65rem; background: var(--surface); }.status-grid strong { display: block; color: var(--nest-red); font-size: 0.82rem; }.status-grid span { display: block; margin-top: 0.2rem; color: var(--text-muted); font-size: 0.58rem; }
.tool-grid, .pillar-grid { display: grid; gap: 0.75rem; margin-top: 2rem; }.tool-grid article, .pillar-grid article { padding: 1.2rem; border: 1px solid var(--border); border-radius: 0.9rem; background: var(--surface); }.tool-grid h3, .pillar-grid h3 { margin-top: 1.2rem; font-size: 0.85rem; font-weight: 850; }.tool-grid small { display: block; margin-top: 0.8rem; color: var(--nest-red); font-size: 0.58rem; font-weight: 800; }
.pillar-grid article { display: flex; flex-direction: column; }.pillar-grid ul { display: grid; gap: 0.5rem; margin-top: 1rem; }.pillar-grid li { display: flex; align-items: flex-start; gap: 0.45rem; color: var(--text-secondary); font-size: 0.65rem; line-height: 1.5; }.pillar-grid li svg { flex: 0 0 auto; margin-top: 0.1rem; color: var(--nest-red); }
.mistakes-card { margin-top: 1rem; padding: 1.25rem; border: 1px solid var(--border); border-radius: 0.9rem; background: var(--surface-2); }.mistakes-heading { display: flex; gap: 0.7rem; }.mistakes-heading > svg { flex: 0 0 auto; color: var(--nest-red); }.mistakes-heading h3 { font-size: 0.9rem; font-weight: 850; }.mistakes-heading p { margin-top: 0.2rem; color: var(--text-muted); font-size: 0.65rem; }.mistakes-card dl { display: grid; gap: 0; margin-top: 1rem; }.mistakes-card dl div { display: grid; gap: 0.3rem; padding: 0.8rem 0; border-top: 1px solid var(--border); }.mistakes-card dt { color: var(--text-primary); font-size: 0.68rem; font-weight: 850; }.mistakes-card dd { color: var(--text-secondary); font-size: 0.66rem; line-height: 1.55; }
.quiz-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }.score-badge { min-width: 4.5rem; padding: 0.7rem; border-radius: 0.7rem; background: var(--nest-red-soft); color: var(--nest-red); text-align: center; }.score-badge strong, .score-badge span { display: block; }.score-badge strong { font-size: 1rem; }.score-badge span { font-size: 0.55rem; font-weight: 750; text-transform: uppercase; }
.quiz-list { display: grid; gap: 0.8rem; margin-top: 2rem; }.quiz-list fieldset { padding: 1.1rem; border: 1px solid var(--border); border-radius: 0.9rem; background: var(--surface); }.quiz-list legend { display: flex; gap: 0.7rem; width: 100%; padding: 0; font-size: 0.77rem; font-weight: 800; line-height: 1.55; }.quiz-list legend span { display: flex; width: 1.55rem; height: 1.55rem; flex: 0 0 auto; align-items: center; justify-content: center; border-radius: 99px; background: var(--nest-red-soft); color: var(--nest-red); font-size: 0.58rem; }
.answer-grid { display: grid; gap: 0.45rem; margin-top: 1rem; }.answer-grid button { padding: 0.7rem 0.8rem; border: 1px solid var(--border); border-radius: 0.55rem; color: var(--text-secondary); font-size: 0.68rem; font-weight: 700; text-align: left; cursor: pointer; }.answer-grid button:hover, .answer-grid button.selected { border-color: var(--nest-red); color: var(--nest-red); }.answer-grid button.correct { border-color: #35a269; background: #eaf9f0; color: #167344; }.answer-grid button.wrong { border-color: var(--nest-red); background: var(--nest-red-soft); color: var(--nest-red); }.answer-feedback { display: flex; align-items: flex-start; gap: 0.5rem; margin-top: 0.8rem; padding: 0.7rem; border-radius: 0.55rem; background: var(--surface-2); color: var(--text-secondary); font-size: 0.65rem; line-height: 1.6; }.answer-feedback svg { flex: 0 0 auto; margin-top: 0.1rem; color: var(--nest-red); }
.roadmap-section { padding-bottom: 0; }.progress-track { height: 0.45rem; overflow: hidden; margin-top: 1.5rem; border-radius: 99px; background: var(--surface-2); }.progress-track span { display: block; height: 100%; border-radius: inherit; background: var(--nest-red); transition: width 0.3s ease; }.progress-label { margin-top: 0.5rem; color: var(--text-muted); font-size: 0.62rem; font-weight: 750; text-align: right; }.roadmap-list { display: grid; gap: 0.45rem; margin-top: 1rem; }.roadmap-list button { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border: 1px solid var(--border); border-radius: 0.65rem; background: var(--surface); color: var(--text-secondary); font-size: 0.7rem; font-weight: 750; text-align: left; cursor: pointer; }.roadmap-list button > span { display: flex; width: 1.8rem; height: 1.8rem; flex: 0 0 auto; align-items: center; justify-content: center; border-radius: 0.45rem; background: var(--surface-2); color: var(--text-muted); font-size: 0.56rem; }.roadmap-list button.complete { border-color: color-mix(in srgb, #35a269 35%, var(--border)); color: var(--text-muted); text-decoration: line-through; }.roadmap-list button.complete > span { background: #eaf9f0; color: #16804a; }
.next-step-card { display: grid; gap: 1rem; margin-top: 1rem; padding: 1.2rem; border-radius: 0.9rem; background: #0d111c; color: white; }.next-step-card > div { display: flex; align-items: center; gap: 0.7rem; }.next-step-card svg { color: #ef5577; }.next-step-card small, .next-step-card strong { display: block; }.next-step-card small { color: #8791a6; font-size: 0.56rem; font-weight: 800; text-transform: uppercase; }.next-step-card strong { margin-top: 0.2rem; font-size: 0.72rem; }.next-step-card code { overflow-x: auto; padding: 0.7rem; border: 1px solid #2c3448; border-radius: 0.5rem; background: #171d2b; color: #dce3f4; font-size: 0.68rem; }

@media (min-width: 640px) {
  .model-grid, .tool-grid { grid-template-columns: repeat(2, 1fr); }
  .structure-grid { grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); }
  .foundation-list article { grid-template-columns: 6rem minmax(12rem, 0.75fr) minmax(0, 1.25fr); align-items: center; }
  .status-grid { grid-template-columns: repeat(3, 1fr); }
  .pillar-grid { grid-template-columns: repeat(3, 1fr); }
  .mistakes-card dl div { grid-template-columns: 9rem 1fr; }
  .answer-grid { grid-template-columns: repeat(2, 1fr); }
  .next-step-card { grid-template-columns: 1fr auto; align-items: center; }
}

@media (min-width: 1024px) {
  .learn-layout { grid-template-columns: 13.5rem minmax(0, 1fr); align-items: start; gap: 4.5rem; }
  .learn-sidebar { position: sticky; top: 7rem; display: block; }
  .model-grid { grid-template-columns: repeat(4, 1fr); }
  .tool-grid { grid-template-columns: repeat(3, 1fr); }
  .di-card { grid-template-columns: auto 1fr; }
}

@media (max-width: 520px) {
  .nest-stats div { min-width: 0; flex: 1; padding: 0 0.65rem; }
  .terminal-card { transform: none; }
  .lesson-section { padding-bottom: 4.5rem; }.lesson-section + .lesson-section { padding-top: 4.5rem; }
  .quiz-heading { display: block; }.score-badge { width: fit-content; margin-top: 1rem; }
}

@media (prefers-reduced-motion: reduce) {
  .terminal-card { transform: none; }
}
</style>
