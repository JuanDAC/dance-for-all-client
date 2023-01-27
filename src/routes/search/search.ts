import {LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';
import {Task} from '@lit-labs/task';
import {styles} from './search.styles';
import {SearchItems} from './search.types';
import {templateRender} from './search.template';

@customElement('dance-for-everyone-route-video-search')
export class VideoSearch extends LitElement {
  static override styles = [...styles];

  searchTerm = '';
  videoSearchTask = new Task(this, async ([searchTerm]) => {
    // Fetch videos from the YouTube API using the searchTerm
    const data = await fetch(
      `http://localhost:3000/media/search?s=${searchTerm}`,
      {
        method: 'GET',
        headers: {
          Accept: '*/*',
        },
      }
    );
    const {data: videos} = (await data.json()) as {data: SearchItems};
    return videos;
  });

  constructor() {
    super();
    this.render = templateRender.bind(this);
  }

  handleSearchInput(event: InputEvent) {
    this.searchTerm = (event.target as HTMLInputElement).value;
  }

  handleSearchAction() {
    this.videoSearchTask.run([this.searchTerm]);
  }
}
