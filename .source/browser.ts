// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"getting-started.mdx": () => import("../content/docs/getting-started.mdx?collection=docs"), "index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "ruah-cli.mdx": () => import("../content/docs/ruah-cli.mdx?collection=docs"), "ruah-conv.mdx": () => import("../content/docs/ruah-conv.mdx?collection=docs"), "ruah-orch.mdx": () => import("../content/docs/ruah-orch.mdx?collection=docs"), }),
};
export default browserCollections;