<template>
  <div :class="{'dark': darkMode}">
    <igt-notifications></igt-notifications>
    <igt-sidebar title="Crystal Space Program">

      <igt-sidebar-category name="Features"></igt-sidebar-category>

      <igt-tab name="Spells" :selected="true">
        <main-crystal :main-crystal-feature="game.features.mainCrystal">
          <mana-bar :mana-resource-feature="game.features.manaResource"></mana-bar>
          <knowledge-bar :knowledge-resource-feature="game.features.knowledgeResource"></knowledge-bar>
        </main-crystal>
        <mana-upgrades :mana-resource-feature="game.features.manaResource" :knowledge-resource-feature="game.features.knowledgeResource"></mana-upgrades>
        <spell-button-list :spell-list-feature="game.features.allSpells" :walletFeature="game.features.wallet"></spell-button-list>
      </igt-tab>

      <igt-tab name="Crystallizer" :canSelect="game.features.knowledgeResource.unlockCrystallizerUpgrade.isBought()">
        <crystallizer-list :wallet-feature="game.features.wallet" :crystal-list-feature="game.features.allCrystals" :spell-list-feature="game.features.allSpells"></crystallizer-list>
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
import MainCrystal from "@/components/features/mana-storage/main-crystal";
import ManaUpgrades from "@/components/features/mana-storage/mana-upgrades";
import ManaBar from "@/components/features/resource-storage/mana-bar"
import KnowledgeBar from "@/components/features/resource-storage/knowledge-bar";
import SpellButtonList from "@/components/features/spells/spell-button-list";
import CrystallizerList from "@/components/features/crystallizer/crystallizer-list";
import {App} from "@/App.ts";
import IgtSidebar from "@/components/util/sidebar/igt-sidebar-layout";
import IgtTab from "@/components/util/igt-tab";
import IgtNotifications from "@/components/util/igt-notifications";
import IgtDeveloperPanel from "@/components/developer-panel/igt-developer-panel";
import IgtSidebarCategory from "@/components/util/sidebar/igt-sidebar-category";
import IgtSidebarExternalLink from "@/components/util/sidebar/igt-sidebar-external-link";
import IgtSettings from "@/components/features/settings/igt-settings";
import IgtTabs from "@/components/util/igt-tabs";

export default {
  components: {
    MainCrystal,
    ManaUpgrades,
    ManaBar,
    KnowledgeBar,
    SpellButtonList,
    CrystallizerList,
    IgtSidebar,
    IgtSettings,
    IgtDeveloperPanel,
    IgtNotifications,
    IgtTab,
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
