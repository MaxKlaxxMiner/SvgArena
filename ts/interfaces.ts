/* tslint:disable:one-line max-line-length interface-name comment-format */

enum PathType
{
  Unknown = 0,
  Move,
  Move_Rel,
  Line,
  Line_Rel,
  HorizontalLine,
  HorizontalLine_Rel,
  VerticalLine,
  VerticalLine_Rel,
  Cubic,
  Cubic_Rel,
  SmoothCubic,
  SmoothCubic_Rel,
  Quadratic,
  Quadratic_Rel,
  SmoothQuadratic,
  SmoothQuadratic_Rel,
  Arc,
  Arc_Rel,
  Close,
  Close_Rel
}

interface PathElement
{
  type: PathType;
}

interface PathElementMove extends PathElement
{
  type: PathType.Move | PathType.Move_Rel;
  x: number;
  y: number;
}

interface PathElementLine extends PathElement
{
  type: PathType.Line | PathType.Line_Rel;
  x: number;
  y: number;
}

interface PathElementHorizontal extends PathElement
{
  type: PathType.HorizontalLine | PathType.HorizontalLine_Rel;
  x: number;
}

interface PathElementVertical extends PathElement
{
  type: PathType.VerticalLine | PathType.VerticalLine_Rel;
  y: number;
}

interface PathElementCubic extends PathElement
{
  type: PathType.Cubic | PathType.Cubic_Rel;
  cx1: number;
  cy1: number;
  cx2: number;
  cy2: number;
  x: number;
  y: number;
}

interface PathElementSmoothCubic extends PathElement
{
  type: PathType.SmoothCubic | PathType.SmoothCubic_Rel;
  cx2: number;
  cy2: number;
  x: number;
  y: number;
}

interface PathElementQuadratic extends PathElement
{
  type: PathType.Quadratic | PathType.Quadratic_Rel;
  cx: number;
  cy: number;
  x: number;
  y: number;
}


interface PathElementSmoothQuadratic extends PathElement
{
  type: PathType.SmoothQuadratic | PathType.SmoothQuadratic_Rel;
  x: number;
  y: number;
}

interface PathElementClose extends PathElement
{
  type: PathType.Close | PathType.Close_Rel;
}
