import './styles/index.scss';
import * as THREE from 'three';

//監視用パラメータ
class Parameters {
  triangles: number;
  points: number;
  lines: number;
  log: string;
  angle: number;
  isVisible: boolean;

  constructor() {
    this.triangles = 0;
    this.points = 0;
    this.lines = 0;
    this.log = '';
    this.angle = 0;
    this.isVisible = true;
  }
}
window.param = new Parameters();
