/**
 * Since the Markdown Editor will lose input focus when user tpye a Tab key,
 * this is a built-in plugin to enable user to input Tab character.
 * Developer can assign its `defaultConfig` to determine
 * the actually input when user type a Tab key and
 * whether to display a switch in the toolbar,
 * see src/demo/index.tsx.
 */

import * as React from 'react';
import { KeyboardEventListener } from '../../share/var';
import { PluginComponent } from '../Plugin';
import DropList from '../../components/DropList';
import i18n from '../../i18n';
import TabMapList from './TabMapList';

/**
 * @field tabMapValue:  Number of spaces will be inputted. Especially, note that 1 means a '\t' instead of ' '.
 * @field show:         Whether to show TabMapList.
 */
interface TabInsertState {
  tabMapValue: number;
  show: boolean;
}

export default class TabInsert extends PluginComponent<TabInsertState> {
  static pluginName = 'tab-insert';
  static defaultConfig = {
    tabMapValue: 1,
  };

  private handleKeyboard: KeyboardEventListener;

  constructor(props: any) {
    super(props);

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.handleChangeMapValue = this.handleChangeMapValue.bind(this);

    this.state = {
      tabMapValue: this.getConfig('tabMapValue'),
      show: false,
    };
    this.handleKeyboard = {
      key: 'Tab',
      keyCode: 9,
      aliasCommand: true,
      withKey: [],
      callback: () => this.editor.insertMarkdown('tab', { tabMapValue: this.state.tabMapValue }),
    };
  }

  private show() {
    this.setState({
      show: true,
    });
  }
  private hide() {
    this.setState({
      show: false,
    });
  }
  private handleChangeMapValue(mapValue: number) {
    this.setState({
      tabMapValue: mapValue,
    });
  }

  componentDidMount() {
    if (this.editorConfig.shortcuts) {
      this.editor.onKeyboard(this.handleKeyboard);
    }
  }

  componentWillUnmount() {
    this.editor.offKeyboard(this.handleKeyboard);
  }

  render() {
    return (
      <span
        className="button button-type-header"
        title={i18n.get('btnHeader')}
        onMouseEnter={this.show}
        onMouseLeave={this.hide}
      >
        <span>
          {'\u2B7E'}
          {this.state.tabMapValue}
        </span>
        <DropList show={this.state.show} onClose={this.hide}>
          <TabMapList onSelectMapValue={this.handleChangeMapValue} />
        </DropList>
      </span>
    );
  }
}