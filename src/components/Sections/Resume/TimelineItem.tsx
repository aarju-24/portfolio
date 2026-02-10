import {FC, memo} from 'react';

import {TimelineItem as TimelineItemType} from '../../../data/dataDef';

const TimelineItem: FC<{item: TimelineItemType}> = memo(({item}) => {
  const {title, date, location, content} = item;

  return (
    <div className="flex flex-col pb-8 last:pb-0 text-center md:text-left">
      <div className="space-y-2">
        {/* Institute Name */}
        <h3 className="text-lg font-semibold text-primary">{location}</h3>

        {/* Degree */}
        <p className="font-medium text-textPrimary">{title}</p>

        {/* Years */}
        <p className="text-sm text-muted">{date}</p>

        {/* Description */}
        <div className="pt-2 text-textSecondary">{content}</div>
      </div>
    </div>
  );
});

TimelineItem.displayName = 'TimelineItem';
export default TimelineItem;
