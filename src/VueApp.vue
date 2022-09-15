<template>
  <div :class="{'dark': darkMode}">
    <igt-notifications></igt-notifications>
    <igt-sidebar title="Crystal Space Program" :header-class="'bg-csp-teal'">

      <igt-sidebar-category name="Features"></igt-sidebar-category>

      <igt-tab name="Workers" :selected="true">
        <igt-wallet :wallet-feature="game.features.wallet"></igt-wallet>
        <crystal-click :crystal-producer-feature="game.features.redCrystalProducer"></crystal-click>
      </igt-tab>

      <igt-tab name="Combat">
      </igt-tab>

      <igt-tab name="Construction" :unlocked="false" :hasAlert="true">
      </igt-tab>

      <igt-tab name="Crafting" :unlocked="false">
      </igt-tab>

      <igt-tab name="Trade" :unlocked="false">
      </igt-tab>

      <igt-tab name="Research" :unlocked="false">
      </igt-tab>

      <igt-tab name="Transport" :unlocked="false">
      </igt-tab>

      <igt-tab name="Automation">
      </igt-tab>

      <igt-tab name="Challenges" :unlocked="false">
      </igt-tab>

      <igt-sidebar-category name="Other"></igt-sidebar-category>
      <igt-tab name="Settings">
        <igt-settings :settings-feature="game.features.settings"></igt-settings>
      </igt-tab>

      <igt-tab name="Developer Panel" v-if="showDevPanel">
        <igt-developer-panel :developer-panel="game.getDeveloperPanel()"></igt-developer-panel>
      </igt-tab>
    </igt-sidebar>

  </div>

</template>

<script>
import {App} from "@/App.ts"
import IgtSidebar from "@/components/util/sidebar/igt-sidebar-layout";
import IgtTab from "@/components/util/igt-tab";
import IgtNotifications from "@/components/util/igt-notifications";
import IgtDeveloperPanel from "@/components/developer-panel/igt-developer-panel";
import IgtSidebarCategory from "@/components/util/sidebar/igt-sidebar-category";
import IgtSidebarExternalLink from "@/components/util/sidebar/igt-sidebar-external-link";
import IgtSettings from "@/components/features/settings/igt-settings";
import IgtWallet from "@/components/features/wallet/igt-wallet";
import IgtTabs from "@/components/util/igt-tabs";
import crystalClick from "@/components/features/crystal-producer/crystal-click";

export default {
  components: {
    IgtSidebar,
    crystalClick,
    IgtSettings,
    IgtDeveloperPanel,
    IgtNotifications,
    IgtTab,
    IgtWallet,
    IgtSidebarCategory
  },
  data() {
    return {
      game: App.game
    }
  },
  computed: {
    showDevPanel() {
      return !App.inProduction;
    },
    darkMode() {
      return true;
    }
  },
}
</script>

<style>
</style>
