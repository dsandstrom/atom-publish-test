'use babel';

import PublishTestView from './publish-test-view';
import { CompositeDisposable } from 'atom';

export default {

  publishTestView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.publishTestView = new PublishTestView(state.publishTestViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.publishTestView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'publish-test:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.publishTestView.destroy();
  },

  serialize() {
    return {
      publishTestViewState: this.publishTestView.serialize()
    };
  },

  toggle() {
    console.log('PublishTest was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
