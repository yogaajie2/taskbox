<template>
  <div :class="classes">
    <label class="checkbox">
      <input
        :checked="isChecked"
        type="checkbox"
        name="checked"
        disabled
      />

      <span
        :aria-label="'archiveTask-' + task.id"
        class="checkbox-custom"
        @click="archiveTask"
      />
    </label>

    <div class="title">
      <input
        :value="task.title"
        type="text"
        placeholder="Input title"
        readonly
        style="text-overflow: ellipsis;"
      />
    </div>

    <div class="actions">
      <a
        v-if="!isChecked"
        @click="pinTask"
      >
        <span
          :aria-label="'pinTask-' + task.id"
          class="icon-star"
        />
      </a>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue';

export default {
  name: 'Task',
  props: {
    task: {
      type: Object,
      required: true,

      default: () => ({
        id: '',
        state: '',
        title: ''
      }),

      validator: (task) => [
        'id',
        'state',
        'title'
      ].every((key) => key in task)
    }
  },

  emits: [
    'archive-task',
    'pin-task'
  ],

  setup(props, { emit }) {
    props = reactive(props);

    return {
      classes: computed(() => ({
        'list-item TASK_INBOX': props.task.state === 'TASK_INBOX',
        'list-item TASK_PINNED': props.task.state === 'TASK_PINNED',
        'list-item TASK_ARCHIVED': props.task.state === 'TASK_ARCHIVED',
      })),

      /**
       * Computed property for checking the state of the task
       */
      isChecked: computed(() => props.task.state === 'TASK_ARCHIVED'),

      /**
       * Event handler for archiving tasks
       */
      archiveTask() {
        emit('archive-task', props.task.id);
      },

      /**
       * Event handler for pinning tasks
       */
      pinTask() {
        emit('pin-task', props.task.id);
      }
    };
  }
};
</script>
