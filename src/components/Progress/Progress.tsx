import React, { Children } from 'react';

import { HtmlLabelProps, SemanticCOLORS, SemanticShorthandContent, SemanticShorthandItem, getClassName, Use, createHTMLDivision } from '../../lib';

export interface ProgressProps extends StrictProgressProps {
  [key: string]: any;
}

export interface StrictProgressProps {
  /** An element type to render as (string or function). */
  as?: React.ElementType;

  /** A progress bar can show activity. */
  active?: boolean;

  /** A progress bar can attach to and show the progress of an element (i.e. Card or Segment). */
  attached?: 'top' | 'bottom';

  /** Whether success state should automatically trigger when progress completes. */
  autoSuccess?: boolean;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** A progress bar can have different colors. */
  color?: SemanticCOLORS;

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent;

  /** A progress bar be disabled. */
  disabled?: boolean;

  /** A progress bar can show a error state. */
  error?: boolean;

  /** An indicating progress bar visually indicates the current level of progress of a task. */
  indicating?: boolean;

  /** A progress bar can have its colors inverted. */
  inverted?: boolean;

  /** Can be set to either to display progress as percent or ratio. */
  label?: SemanticShorthandItem<HtmlLabelProps>;

  /** Current percent complete. */
  percent?: number;

  /** Decimal point precision for calculated progress. */
  precision?: number;

  /** A progress bar can contain a text value indicating current progress. */
  progress?: boolean | 'percent' | 'ratio' | 'value';

  /** A progress bar can vary in size. */
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'big';

  /** A progress bar can show a success state. */
  success?: boolean;

  /** For use with value. Together, these will calculate the percent. Mutually excludes percent. */
  total?: number;

  /** For use with total. Together, these will calculate the percent. Mutually excludes percent. */
  value?: number;

  /** A progress bar can show a warning state. */
  warning?: boolean;
}

/**
 * A progress bar shows the progression of a task.
 */
export const Progress: React.FC<ProgressProps> = props => {

  const { as: ElementType = 'div', active, attached, className, color, disabled, error, indicating, inverted, size, success, warning, children, content, label, autoSuccess, precision, progress, total, value, percent, ...rest } = props;
  const classes = getClassName(
    'ui', color, size,
    // tslint:disable-next-line: object-shorthand-properties-first
    { active: active || indicating, disabled, error, indicating, inverted, success: success || (autoSuccess && (percent! >= 100 || value! >= total!)), warning },
    [Use.ValueKey, { attached }],
    'progress', className,
  );

  const p = __getPercent(props) ?? 0;

  return (
    <ElementType {...rest} className={classes} data-percent={Math.floor(p)}>
      <div className='bar' style={{ width: `${p}%` }}>
        {__renderProgress(props, p)}
      </div>
      {__renderLabel(props)}
    </ElementType>
  );
};

const __calculatePercent = ({ percent, total, value }: ProgressProps) => {

  if (percent != null) return percent;
  if (total != null && value != null) return (value / total) * 100;
};

const __getPercent = (props: ProgressProps) => {

  const { precision, progress, total, value } = props;

  // tslint:disable-next-line: triple-equals
  if ((total != null) && (value != null) && progress == 'value') return (value / total) * 100;

  // tslint:disable-next-line: triple-equals
  if (progress == 'value') return value;

  const percent = limit(__calculatePercent(props));
  return precision == null ? percent : Number(percent.toFixed(precision)); // withPrecision(percent, precision);
};

// const __isAutoSuccess = ({ autoSuccess, percent, total, value }: ProgressProps) =>
//   autoSuccess && (percent! >= 100 || value! >= total!);

const __renderLabel = ({ children, content, label }: ProgressProps) => {

  if (Children.count(children)) return <div className='label'>{children}</div>;

  if (content != null) return <div className='label'>{content}</div>;

  return createHTMLDivision(label, { autoGenerateKey: false, defaultProps: { className: 'label' } });
};

// const __computeValueText = ({ progress, total, value }: ProgressProps, percent: any) => {

//   if (progress === 'value') return value;
//   if (progress === 'ratio') return `${value}/${total}`;
//   return `${percent}%`;
// };

const __renderProgress = ({ progress, total, value, precision }: ProgressProps, percent: any) => {

  if (!progress && (precision == null)) return;

  return (
    <div className='progress'>
      {
        // tslint:disable-next-line: triple-equals
        progress == 'value' ? value : progress == 'ratio' ? `${value}/${total}` : `${percent}%`
      }
    </div>
  );
};

const limit = (x: any) => x < 0 ? 0 : x > 100 ? 100 : x;

// const withPrecision = (x: number, precision: number | undefined) => precision == null ? x : Number(x.toFixed(precision));
