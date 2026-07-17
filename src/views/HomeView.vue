<script setup lang="ts">
import DefaultLayout from '../layouts/DefaultLayout.vue'
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import SkillsSection from '../components/SkillsSection.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import EducationSection from '../components/EducationSection.vue'
import ContactSection from '../components/ContactSection.vue'
</script>

<template>
  <DefaultLayout>
    <HeroSection />
    <AboutSection />
    <ProjectsSection />
    <SkillsSection />
    <EducationSection />
    <ContactSection />
  </DefaultLayout>
</template>
