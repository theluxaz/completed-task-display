import { App, Plugin, addIcon, PluginManifest } from 'obsidian';

export default class TaskHiderPlugin extends Plugin {
	statusBar: HTMLElement;

	constructor(app: App, manifest: PluginManifest) {
		super(app, manifest);
		this.statusBar = this.addStatusBarItem();
	}

	toggleCompletedTaskView() {
		document.body.toggleClass('hide-completed-tasks', hiddenState);
		hiddenState = !hiddenState;
		this.statusBar.setText(hiddenState ? 'Showing Completed Tasks' : 'Hiding Completed Tasks');
	}

	async onload() {
		console.log('loading completed-task-display plugin');
		this.statusBar.setText('Showing Completed Tasks');
		this.toggleCompletedTaskView()

		addIcon('tasks', taskShowIcon);
		this.addRibbonIcon('tasks', 'Task Hider', () => { this.toggleCompletedTaskView()});
		this.addCommand({
			id: "toggle-completed-task-view",
			name: "Toggle Completed Task View",
			callback: () => {
				this.toggleCompletedTaskView();
			}
		});
	}

	onunload() {
		console.log('unloading completed-task-display plugin');
	}
}
const taskShowIcon = `<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="tasks" class="svg-inline--fa fa-tasks fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M145.35 207a8 8 0 0 0-11.35 0l-71 71-39-39a8 8 0 0 0-11.31 0L1.35 250.34a8 8 0 0 0 0 11.32l56 56a8 8 0 0 0 11.31 0l88-88a8 8 0 0 0 0-11.32zM62.93 384c-17.67 0-32.4 14.33-32.4 32s14.73 32 32.4 32a32 32 0 0 0 0-64zm82.42-337A8 8 0 0 0 134 47l-71 71-39-39a8 8 0 0 0-11.31 0L1.35 90.34a8 8 0 0 0 0 11.32l56 56a8 8 0 0 0 11.31 0l88-88a8 8 0 0 0 0-11.32zM503 400H199a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h304a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm0-320H199a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h304a8 8 0 0 0 8-8V88a8 8 0 0 0-8-8zm0 160H199a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h304a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8z"></path></svg>`
let hiddenState = true;
