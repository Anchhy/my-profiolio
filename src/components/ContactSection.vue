<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ArrowUpRight, Check, Copy, Github, Mail, MapPin, Phone, Send } from 'lucide-vue-next'
import { personalInfo } from '../data/portfolio'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { elementRef } = useScrollAnimation()
const copied = ref(false)
const statusMessage = ref('')
const form = reactive({ name: '', email: '', message: '' })

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(personalInfo.socialLinks.email)
    copied.value = true
    window.setTimeout(() => (copied.value = false), 1800)
  } catch {
    window.location.href = `mailto:${personalInfo.socialLinks.email}`
  }
}

const submitContact = () => {
  const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`)
  const body = encodeURIComponent(`Hi Anchhy,\n\n${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`)
  statusMessage.value = 'Opening your email application…'
  window.location.href = `mailto:${personalInfo.socialLinks.email}?subject=${subject}&body=${body}`
}
</script>

<template>
  <section id="contact" class="section-shell contact-section">
    <div ref="elementRef" class="reveal mx-auto max-w-7xl">
      <div class="contact-panel">
        <div class="contact-intro">
          <p class="contact-kicker">05 / Let’s connect</p>
          <h2>Have a role or project in mind?</h2>
          <p>
            I’m open to web development internships and thoughtful collaborations. Tell me what you’re building or where I could contribute.
          </p>

          <div class="contact-details">
            <div>
              <Mail :size="18" />
              <span><small>Email</small><a :href="`mailto:${personalInfo.socialLinks.email}`">{{ personalInfo.socialLinks.email }}</a></span>
              <button type="button" :aria-label="copied ? 'Email copied' : 'Copy email address'" @click="copyEmail">
                <Check v-if="copied" :size="16" /><Copy v-else :size="16" />
              </button>
            </div>
            <a :href="personalInfo.socialLinks.github" target="_blank" rel="noopener noreferrer">
              <Github :size="18" /><span><small>GitHub</small>@Anchhy</span><ArrowUpRight :size="15" />
            </a>
            <a :href="`tel:${personalInfo.socialLinks.phone.replace(/\s/g, '')}`">
              <Phone :size="18" /><span><small>Phone</small>{{ personalInfo.socialLinks.phone }}</span>
            </a>
            <div>
              <MapPin :size="18" /><span><small>Location</small>{{ personalInfo.location }}</span>
            </div>
          </div>
        </div>

        <form class="contact-form" @submit.prevent="submitContact">
          <div class="form-heading">
            <div>
              <span>Send a message</span>
              <small>This opens your email app</small>
            </div>
            <Send :size="20" />
          </div>

          <label>
            Your name
            <input v-model.trim="form.name" type="text" name="name" autocomplete="name" placeholder="Jane Smith" required />
          </label>
          <label>
            Email address
            <input v-model.trim="form.email" type="email" name="email" autocomplete="email" placeholder="jane@company.com" required />
          </label>
          <label>
            Message
            <textarea v-model.trim="form.message" name="message" rows="5" placeholder="Tell me a little about the opportunity…" required></textarea>
          </label>

          <button type="submit" class="contact-submit">Prepare email <ArrowUpRight :size="16" /></button>
          <p class="form-status" aria-live="polite">{{ statusMessage }}</p>
        </form>
      </div>
    </div>
  </section>
</template>
