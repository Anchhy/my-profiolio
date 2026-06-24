<script setup lang="ts">
import { ref } from 'vue'
import { personalInfo } from '../data/portfolio'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import {
  Send,
  Phone,
  Mail,
  Github,
  Copy,
  Check,
  MapPin,
} from 'lucide-vue-next'

const { elementRef } = useScrollAnimation()

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const copied = ref(false)
const submitted = ref(false)

const copyEmail = () => {
  navigator.clipboard.writeText(personalInfo.socialLinks.email)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}

const handleSubmit = () => {
  // Open mailto as fallback
  const mailtoUrl = `mailto:${personalInfo.socialLinks.email}?subject=${encodeURIComponent(
    form.value.subject
  )}&body=${encodeURIComponent(
    `Name: ${form.value.name}\nEmail: ${form.value.email}\n\n${form.value.message}`
  )}`
  window.open(mailtoUrl, '_blank')
  submitted.value = true
  setTimeout(() => {
    submitted.value = false
    form.value = { name: '', email: '', subject: '', message: '' }
  }, 3000)
}

const contactCards = [
  {
    icon: Phone,
    label: 'Phone',
    value: personalInfo.socialLinks.phone,
    href: `tel:${personalInfo.socialLinks.phone.replace(/\s/g, '')}`,
  },
  {
    icon: Mail,
    label: 'Email',
    value: personalInfo.socialLinks.email,
    href: `mailto:${personalInfo.socialLinks.email}`,
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/Anchhy',
    href: personalInfo.socialLinks.github,
  },
]
</script>

<template>
  <section id="contact" class="py-24 px-4 sm:px-6 lg:px-8">
    <div ref="elementRef" class="reveal max-w-6xl mx-auto">
      <h2 class="section-title">
        Get In <span class="gradient-text">Touch</span>
      </h2>
      <p class="section-subtitle">
        Have a project in mind or want to collaborate? Feel free to reach out!
      </p>

      <div class="grid lg:grid-cols-5 gap-8">
        <!-- Contact Form -->
        <div class="lg:col-span-3">
          <form @submit.prevent="handleSubmit" class="card p-6 sm:p-8">
            <div class="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  for="contact-name"
                  class="block text-sm font-medium mb-1.5"
                  style="color: var(--text-primary)"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="Your name"
                  class="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[var(--color-primary-500)]"
                  style="
                    background: var(--bg);
                    border: 1px solid var(--border);
                    color: var(--text-primary);
                  "
                />
              </div>
              <div>
                <label
                  for="contact-email"
                  class="block text-sm font-medium mb-1.5"
                  style="color: var(--text-primary)"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  class="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[var(--color-primary-500)]"
                  style="
                    background: var(--bg);
                    border: 1px solid var(--border);
                    color: var(--text-primary);
                  "
                />
              </div>
            </div>

            <div class="mb-4">
              <label
                for="contact-subject"
                class="block text-sm font-medium mb-1.5"
                style="color: var(--text-primary)"
              >
                Subject
              </label>
              <input
                id="contact-subject"
                v-model="form.subject"
                type="text"
                required
                placeholder="What's this about?"
                class="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[var(--color-primary-500)]"
                style="
                  background: var(--bg);
                  border: 1px solid var(--border);
                  color: var(--text-primary);
                "
              />
            </div>

            <div class="mb-6">
              <label
                for="contact-message"
                class="block text-sm font-medium mb-1.5"
                style="color: var(--text-primary)"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                v-model="form.message"
                rows="5"
                required
                placeholder="Your message..."
                class="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                style="
                  background: var(--bg);
                  border: 1px solid var(--border);
                  color: var(--text-primary);
                "
              ></textarea>
            </div>

            <button
              type="submit"
              class="btn-primary w-full justify-center"
              :class="{ 'opacity-80': submitted }"
            >
              <template v-if="submitted">
                <Check :size="18" />
                Message Sent!
              </template>
              <template v-else>
                <Send :size="18" />
                Send Message
              </template>
            </button>
          </form>
        </div>

        <!-- Contact Info -->
        <div class="lg:col-span-2 space-y-4">
          <div
            v-for="card in contactCards"
            :key="card.label"
            class="card p-5"
          >
            <a
              :href="card.href"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-4 group"
              style="text-decoration: none"
            >
              <div
                class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                style="
                  background: linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.12));
                  color: var(--color-primary-500);
                "
              >
                <component :is="card.icon" :size="22" />
              </div>
              <div>
                <p class="text-xs font-medium mb-0.5" style="color: var(--text-secondary)">
                  {{ card.label }}
                </p>
                <p class="text-sm font-semibold" style="color: var(--text-primary)">
                  {{ card.value }}
                </p>
              </div>
            </a>
          </div>

          <!-- Copy Email Button -->
          <button
            id="copy-email-button"
            @click="copyEmail"
            class="w-full card p-4 flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 hover:scale-[1.02]"
            style="color: var(--color-primary-500)"
          >
            <Transition name="icon" mode="out-in">
              <Check v-if="copied" :size="18" />
              <Copy v-else :size="18" />
            </Transition>
            <span class="text-sm font-semibold">
              {{ copied ? 'Copied!' : 'Copy Email Address' }}
            </span>
          </button>

          <!-- Location Card -->
          <div class="card p-5">
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style="
                  background: linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.12));
                  color: var(--color-primary-500);
                "
              >
                <MapPin :size="22" />
              </div>
              <div>
                <p class="text-xs font-medium mb-0.5" style="color: var(--text-secondary)">
                  Location
                </p>
                <p class="text-sm font-semibold" style="color: var(--text-primary)">
                  Phnom Penh, Cambodia
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.icon-enter-active,
.icon-leave-active {
  transition: all 0.2s ease;
}
.icon-enter-from {
  opacity: 0;
  transform: scale(0.5);
}
.icon-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>
