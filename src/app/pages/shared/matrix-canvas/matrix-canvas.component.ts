import { isPlatformBrowser } from "@angular/common";
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  PLATFORM_ID,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-matrix-rain",
  standalone: true,
  templateUrl: "./matrix-canvas.component.html",
  styleUrl: "./matrix-canvas.component.css",
})
export class MatrixRainComponent implements AfterViewInit {
  @Input() containerId: string = "matrixRainContainer";
  @Input() givenWord: string = "FINDDEV";
  @Input() fontSize: number = 20;
  @Input() fromHome: boolean = true;
  @Input() fromContact: boolean = false;
  @ViewChild("matrixRainCanvas", { static: true })
  matrixRainCanvas!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private word: { letter: string; shape: string[][] }[] = [];
  private columns: number = 0;
  private drops: number[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!this.containerId) {
      console.error("Please provide a target container ID for the robot.");
      return;
    }
    if (isPlatformBrowser(this.platformId)) {
      this.setupCanvasSize();
      this.setupCanvas();
      this.setupWordShapes();
      this.setupColumns();
      this.setupDrops();
      this.animateMatrixRain();
    }
  }

  private setupCanvasSize(): void {
    const container = document.getElementById(this.containerId);
    if (container && this.matrixRainCanvas) {
      if (this.fromHome) {
        this.matrixRainCanvas.nativeElement.width = 750;
        this.matrixRainCanvas.nativeElement.height = 250;
      } else if (this.fromContact) {
        this.matrixRainCanvas.nativeElement.width = 1160;
        this.matrixRainCanvas.nativeElement.height = 500;
      } else {
        this.matrixRainCanvas.nativeElement.width = 860;
        this.matrixRainCanvas.nativeElement.height = 500;
      }
    } else {
      console.error(`Container with ID '${this.containerId}' not found.`);
    }
  }

  private setupCanvas(): void {
    this.ctx = this.matrixRainCanvas.nativeElement.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
  }

  private setupWordShapes(): void {
    this.word = this.givenWord.split("").map((letter) => {
      return {
        letter: letter,
        shape: this.generateLetterShape(letter),
      };
    });
  }

  private setupColumns(): void {
    this.columns = this.matrixRainCanvas.nativeElement.width / this.fontSize;
  }

  private setupDrops(): void {
    this.drops = Array.from({ length: this.columns }, () => 1);
  }

  private animateMatrixRain(): void {
    setInterval(() => {
      this.draw();
    }, 600);
  }

  private draw(): void {
    this.ctx.fillStyle = "rgba(248,248,255,0.9)";
    this.ctx.fillRect(
      0,
      0,
      this.matrixRainCanvas.nativeElement.width,
      this.matrixRainCanvas.nativeElement.height
    );

    let currentX = 0; // Track the current horizontal position

    for (let i = 0; i < this.drops.length; i++) {
      const letter = this.word[i % this.word.length];
      this.ctx.fillStyle = "#1ac4ff";
      this.ctx.font = `${this.fontSize}px monospace`;

      const delay = i * 20; // Adjust the delay as needed

      this.animateLetter(i, currentX, letter, delay);

      currentX += letter.shape[0].length * this.fontSize + 60; // Add padding between letters
    }
  }

  private animateLetter(
    index: number,
    currentX: number,
    letter: any,
    delay: number
  ): void {
    setTimeout(() => {
      const originalDrop = this.drops[index];

      for (let row = 0; row < letter.shape.length; row++) {
        for (let col = 0; col < letter.shape[row].length; col++) {
          const bit = letter.shape[row][col];
          if (bit !== "") {
            this.ctx.fillText(
              bit,
              currentX + col * this.fontSize,
              (originalDrop + row) * this.fontSize
            );
          }
        }
      }

      // Move the drop position down
      this.drops[index]++;

      // Reset the drop position to the top if it reaches the bottom
      if (
        this.drops[index] * this.fontSize >
        this.matrixRainCanvas.nativeElement.height
      ) {
        this.drops[index] = 0;
      }
    }, delay);
  }

  private generateLetterShape(letter: string): string[][] {
    const shapes: { [key: string]: string[][] } = {
      F: [
        ["0", "1", "1"],
        ["1", "", ""],
        ["1", "0", "0"],
        ["0", "", ""],
        ["1", "", ""],
      ],
      I: [
        ["1", "", ""],
        ["0", "", ""],
        ["1", "", ""],
        ["1", "", ""],
        ["0", "", ""],
      ],
      D: [
        ["1", "0", ""],
        ["1", "", "1"],
        ["0", "", "1"],
        ["1", "", "1"],
        ["1", "0", ""],
      ],
      E: [
        ["0", "1", "0"],
        ["1", "", ""],
        ["1", "1", "1"],
        ["1", "", ""],
        ["0", "1", "0"],
      ],
      V: [
        ["1", "", "1"],
        ["0", "", "0"],
        ["0", "", "0"],
        ["0", "", "0"],
        ["", "1", ""],
      ],
      A: [
        ["", "1", ""],
        ["0", "", "1"],
        ["1", "1", "1"],
        ["0", "", "0"],
        ["1", "", "1"],
      ],
      B: [
        ["1", "0", ""],
        ["1", "", "1"],
        ["1", "0", ""],
        ["1", "", "1"],
        ["1", "0", ""],
      ],
      U: [
        ["1", "", "1"],
        ["1", "", "1"],
        ["1", "", "1"],
        ["1", "", "1"],
        ["0", "1", "0"],
      ],
      T: [
        ["1", "1", "1"],
        ["", "1", ""],
        ["", "0", ""],
        ["", "1", ""],
        ["", "0", ""],
      ],
      S: [
        ["", "1", "0"],
        ["1", "", ""],
        ["", "0", ""],
        ["", "", "1"],
        ["1", "0", ""],
      ],
      C: [
        ["", "1", "0"],
        ["1", "", ""],
        ["0", "", ""],
        ["1", "", ""],
        ["", "1", "0"],
      ],
      O: [
        ["", "1", ""],
        ["0", "", "0"],
        ["0", "", "0"],
        ["0", "", "0"],
        ["", "1", ""],
      ],
      N: [
        ["1", "", "", "", "0"],
        ["0", "0", "", "", "1"],
        ["1", "", "1", "", "1"],
        ["0", "", "", "0", "0"],
        ["1", "", "", "", "1"],
      ],
    };

    return shapes[letter] || [[""]];
  }
}
