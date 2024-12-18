import { findLoopPossibilities } from "./utils";

self.onmessage = (event: MessageEvent) => {
  const reportProgress = (progress: number) => self.postMessage({ progress });
  const loopPossibilities = findLoopPossibilities(event.data.floorplan, reportProgress);

  self.postMessage({ loopPossibilities });
};
