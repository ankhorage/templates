import { createRoot, type Root } from 'react-dom/client';
import React from 'react';

import { createRuntimeMemoryStateAdapter, RuntimeScreen } from '@ankhorage/runtime';
import { Button } from '@ankhorage/zora/web/button';
import { Card } from '@ankhorage/zora/web/card';
import { ChessBoard } from '@ankhorage/zora/web/chess-board';
import { Heading } from '@ankhorage/zora/web/heading';
import { Icon } from '@ankhorage/zora/web/icon';
import { Image } from '@ankhorage/zora/web/image';
import { ZoraProvider } from '@ankhorage/zora/web/runtime';
import { Screen } from '@ankhorage/zora/web/screen';
import { Select } from '@ankhorage/zora/web/select';
import { Text } from '@ankhorage/zora/web/text';
import { View } from '@ankhorage/zora/web/view';

import createAppManifest from '../src/templates/categories/games/grossmeister/createAppManifest';

const manifest = createAppManifest();
const stateAdapter = createRuntimeMemoryStateAdapter();
const host = document.getElementById('root');
const registry = { Button, Card, ChessBoard, Heading, Icon, Image, Screen, Select, Text, View };

if (host === null) throw new Error('GrossMeister acceptance host is missing.');

let root: Root;

/*** Mount the released Runtime and ZORA public boundaries with one host-owned state adapter. */
function mount(): void {
  const screen = manifest.screens.play;
  if (screen === undefined) throw new Error('GrossMeister play screen is missing.');
  root.render(
    <ZoraProvider mode="light">
      <RuntimeScreen
        manifest={manifest}
        registry={registry}
        screen={screen}
        stateAdapter={stateAdapter}
      />
    </ZoraProvider>,
  );
}

root = createRoot(host);
mount();

declare global {
  interface Window {
    grossmeisterAcceptance: {
      readonly readState: () => unknown;
      readonly remount: () => void;
    };
  }
}

window.grossmeisterAcceptance = {
  readState: () => stateAdapter.get('grossmeister.board'),
  remount: () => {
    root.unmount();
    root = createRoot(host);
    mount();
  },
};
