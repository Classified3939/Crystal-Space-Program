<template>
  <div :class="{ dark: darkMode }">
    <igt-notifications></igt-notifications>
    <igt-sidebar title="Crystal Space Program">
      <igt-sidebar-category name="Features"></igt-sidebar-category>
      <igt-tab class="flex" name="Main" :selected="true">
        <skills></skills>
        <action-list></action-list>
        <csp-inventory></csp-inventory>
      </igt-tab>

      <igt-sidebar-category name="Other"></igt-sidebar-category>

      <igt-tab name="Settings">
        <igt-settings :settings-feature="game.features.settings"></igt-settings>
      </igt-tab>

      <igt-tab name="Developer Panel" v-if="showDevPanel">
        <igt-developer-panel
          :developer-panel="game.getDeveloperPanel()"
        ></igt-developer-panel>
      </igt-tab>

      <igt-sidebar-category name="Socials"></igt-sidebar-category>
      <igt-sidebar-external-link
        name="Discord"
        link="https://discord.gg/WUYDqct2Ef"
        image="socials/discord.png"
      ></igt-sidebar-external-link>
      <igt-sidebar-external-link
        name="Documentation"
        link="https://123ishatest.github.io/igt-docs"
        image="socials/docusaurus.svg"
      ></igt-sidebar-external-link>
      <igt-sidebar-external-link
        name="GitHub"
        link="https://github.com/123ishaTest/igt-library"
        image="socials/github.png"
      ></igt-sidebar-external-link>
    </igt-sidebar>
  </div>
</template>

<script>
import Skills from "@/my-game/components/skills";
import ActionList from "@/my-game/components/action-list"
import CspInventory from "@/my-game/components/csp-inventory"

//from template
import { App } from "@/App.ts";
import IgtSidebar from "@/components/util/sidebar/igt-sidebar-layout";
import IgtTab from "@/components/util/igt-tab";
import IgtNotifications from "@/components/util/igt-notifications";
import IgtDeveloperPanel from "@/components/developer-panel/igt-developer-panel";
import IgtSidebarCategory from "@/components/util/sidebar/igt-sidebar-category";
import IgtSidebarExternalLink from "@/components/util/sidebar/igt-sidebar-external-link";
import IgtSettings from "@/components/features/settings/igt-settings";

export default {
  components: {
    IgtSettings,
    IgtSidebarExternalLink,
    IgtSidebarCategory,
    IgtDeveloperPanel,
    IgtNotifications,
    IgtTab,
    IgtSidebar,
    Skills,
    ActionList,
    CspInventory
  },
  data() {
    return {
      game: App.game,
    };
  },
  computed: {
    showDevPanel() {
      return !App.inProduction;
    },
    darkMode() {
      return true;
    },
  },
};
</script>

<style></style>
