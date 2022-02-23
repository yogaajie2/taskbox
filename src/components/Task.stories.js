import Task from './Task.vue';
import { action } from "@storybook/addon-actions";

export default {
  component: Task,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'Task',
  //👇 Our events will be mapped in Storybook UI
  argTypes: {
    onPinTask: {},
    onArchiveTask: {}
  }
};

export const actionsData = {
  onPinTask: action('pin-task'),
  onArchiveTask: action('archive-task')
};

const Template = args => ({
  components: { Task },

  setup() {
    return { args, ...actionsData };
  },

  template: '<Task v-bind="args" />'
})

export const Default = Template.bind({});

Default.args = {
  task: {
    id: '1',
    title: 'Test Task',
    state: 'TASK_INBOX',
    updatedAt: new Date(2018, 0, 1, 9, 0)
  }
};

export const Pinned = Template.bind({});

Pinned.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_PINNED'
  }
};

export const Archived = Template.bind({});

Archived.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_ARCHIVED'
  }
};

const longTitleString = `AN ABSURDLY RIDICULUOSLY LONG TASK TITLE. BRO  HOW WOULD THIS EVEN FIT? IT'S IMPOSSIBLE BRO. SIKE! IT STILL FITS. JUST ADD MORE TEXT HERE AND THERE. LOREM IPSUM AND ALL THAT. THERE. THAT  SHOULD BE  ENOUGH.`
export const LongTitle = Template.bind({});

LongTitle.args = {
  task: {
    ...Default.args.task,
    title: longTitleString
  }
};
