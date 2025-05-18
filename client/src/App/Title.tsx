import {CircleHelp} from 'lucide-react';
import {useRunningTaskRunIds} from 'tinytick/ui-react';
import {Button, classNames} from 'tinywidgets';
import {button, logo, spinning} from './Title.css.ts';

export const Title = () => {
  const running = (useRunningTaskRunIds()?.length ?? 0) > 0;
  return (
    <>
      <img
        src="/favicon.svg"
        alt="TinyHub logo"
        className={classNames(logo, running && spinning)}
      />
      <h1>TinyHub</h1>
      <Button
        variant="icon"
        icon={CircleHelp}
        href="https://github.com/tinyplex/tinyhub"
        alt="A local-first GitHub client, built in public."
        className={button}
      />
    </>
  );
};
