<template>
  <div :class="{'dark': darkMode}">
    <igt-notifications></igt-notifications>
    <igt-sidebar title="Crystal Space Program">
      <igt-tab name="Main" selected="true">
        <igt-inventory :inventoryFeature="game.features.mainInventory"
                        :heldItemFeature="game.features.heldItem"></igt-inventory>
        <held-stack :mainInventoryFeature="game.features.mainInventory"
                    :singleSlotInventory="game.features.heldItem"></held-stack>
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
/*import MainCrystal from "@/components/features/mana-storage/main-crystal";
import ManaUpgrades from "@/components/features/mana-storage/mana-upgrades";
import ManaBar from "@/components/features/resource-storage/mana-bar"
import KnowledgeBar from "@/components/features/resource-storage/knowledge-bar";
import SpellButtonList from "@/components/features/spells/spell-button-list";
import CrystallizerList from "@/components/features/crystallizer/crystallizer-list";*/
import IgtInventory from "@/components/features/inventory/igt-inventory";
import HeldStack from "@/my-game/components/held-stack";
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
    HeldStack,
    IgtInventory,
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
