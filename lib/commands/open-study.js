import { toArray } from '@phosphor/algorithm';
import { FileBrowserModel } from '@jupyterlab/filebrowser';

const Private = {
  id: 0
};

const execute = props => async args => {
  const { manager, shell } = props;

  const cwd = args.cwd ? String(args.cwd) : '';
  const id = `open-${Private.id + 1}`;

  const filebrowser = new FileBrowserModel({
    manager,
    driveName: '',
    state: null
  });

  let kysofile = null;
  try {
    const _kysofile = await filebrowser.manager.services.contents.get('.kyso');
    kysofile = _kysofile.content;
  } catch (err) {
    console.error(err);
    // no kysofile
  }

  if (kysofile) {
    const author = kysofile.split('/')[0].trim();
    if (author === props.user.nickname) {
      window.open(`https://kyso.io/${author}/${kysofile.split('/')[1].trim()}`, '_blank');
    }
  }
};

const command = props => ({
  label: 'View on Kyso ',
  execute: execute(props)
});

export default command;