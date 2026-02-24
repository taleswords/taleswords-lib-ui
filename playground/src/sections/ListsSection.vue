<script setup lang="ts">
import { ref, computed } from 'vue'
import { UiCard, UiList, UiListItem, UiPathList, UiButton } from '@lib'

interface DialogueNode {
    id: string
    label: string
    children?: DialogueNode[]
}

const dialogueTree: DialogueNode = {
    id: 'root',
    label: 'Story Root',
    children: [
        {
            id: 'ch1',
            label: 'Chapter 1: The Beginning',
            children: [
                {
                    id: 'scene1',
                    label: 'Scene: Tavern Meeting',
                    children: [
                        { id: 'enter', label: 'Player enters tavern' },
                        {
                            id: 'npc1',
                            label: 'NPC: Old Wizard',
                            children: [
                                {
                                    id: 'd1',
                                    label: '"Greetings, traveler..."',
                                    children: [
                                        { id: 'r1', label: '"Hello, who are you?"', children: [
                                            { id: 'r1a', label: '"I am a wizard..."' },
                                        ]},
                                        { id: 'r2', label: '"I\'m busy, goodbye."' },
                                        { id: 'r3', label: '[Stay silent]', children: [
                                            { id: 'r3a', label: '"Not much of a talker, eh?"' },
                                        ]},
                                    ],
                                },
                            ],
                        },
                        { id: 'npc2', label: 'NPC: Bartender', children: [
                            { id: 'b1', label: '"What\'ll it be?"' },
                        ]},
                    ],
                },
                { id: 'scene2', label: 'Scene: Forest Path' },
            ],
        },
        { id: 'ch2', label: 'Chapter 2: The Journey', children: [
            { id: 's2a', label: 'Scene: Mountain Pass' },
        ]},
    ],
}

const selectedListItem = ref<string | null>(null)
const pathItems = ref<Array<{ id: string; label: string }>>([{ id: 'root', label: 'Story Root' }])

const currentChildren = computed(() => {
    let node: DialogueNode | undefined = dialogueTree
    for (let i = 1; i < pathItems.value.length; i++) {
        node = node?.children?.find(c => c.id === pathItems.value[i].id)
    }
    return node?.children ?? []
})

function handlePathSelect(item: { id: string | number }, index: number) {
    pathItems.value = pathItems.value.slice(0, index + 1)
    selectedListItem.value = null
}

function handleDrillDown(item: DialogueNode) {
    if (item.children && item.children.length > 0) {
        pathItems.value = [...pathItems.value, { id: item.id, label: item.label }]
        selectedListItem.value = null
    }
}
</script>

<template>
    <UiCard variant="outlined">
        <h2>UiList & UiListItem</h2>
        <div class="list-demo">
            <div class="list-demo__path">
                <h4>Path Navigation</h4>
                <UiPathList
                    :items="pathItems"
                    :selected-id="pathItems[pathItems.length - 1]?.id"
                    max-height="200px"
                    @select="handlePathSelect"
                />
            </div>
            <div class="list-demo__items">
                <h4>Children</h4>
                <UiList max-height="250px">
                    <UiListItem
                        v-for="item in currentChildren"
                        :key="item.id"
                        :has-children="item.children && item.children.length > 0"
                        :selected="selectedListItem === item.id"
                        @click="selectedListItem = item.id"
                        @expand="handleDrillDown(item)"
                        @dblclick="handleDrillDown(item)"
                    >
                        {{ item.label }}
                        <template #actions>
                            <UiButton variant="ghost" icon="pencil" size="small" />
                            <UiButton variant="ghost-danger" icon="trash-empty" size="small" />
                        </template>
                    </UiListItem>
                    <template #footer>
                        <UiButton variant="ghost-primary" icon="plus" size="small">Add item</UiButton>
                    </template>
                </UiList>
            </div>
        </div>
        <p>Selected: {{ selectedListItem || '(none)' }}</p>
    </UiCard>
</template>

<style scoped>
.list-demo {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.list-demo h4 {
    margin: 0 0 0.5rem 0;
    font-size: 0.875rem;
}

@media (max-width: 600px) {
    .list-demo {
        grid-template-columns: 1fr;
    }
}
</style>
