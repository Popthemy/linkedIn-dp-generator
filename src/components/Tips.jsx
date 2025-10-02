import {
  Info,
  Image,
  User,
  RefreshCw,
  Download,
  Share2,
  Heart,
} from "lucide-react";

import "../styles/tips.css";

export default function Tips() {
  return (
    <div className="tips-container">
      <h3 className="tips-title flex items-center gap-2">
        <Info className="tips-icon" />
        Tips: How to use this DP Generator
      </h3>

      <ul className="tips-list space-y-4">
        <li className="tip-item flex gap-2 items-start">
          <p>
            <strong>
              <User className="tips-icon" />
              Include your details
            </strong>
            —
            <span className="text-gray-700">
              Your <em>Name</em> is always required.
            </span>
          </p>
        </li>

        <li className="tip-item flex gap-2 items-start">
          <p>
            <strong>
              <Image className="tips-icon" />
              Use a portrait image
            </strong>
            —
            <span className="text-gray-700">
              This ensures best alignment inside the diamond shape.
            </span>
          </p>
        </li>

        <li className="tip-item flex gap-2 items-start">
          <p>
            <strong>
              <RefreshCw className="tips-icon" />
              Replacing your image?
            </strong>
            —
            <span className="text-gray-700">
              Click the diamond shape again or reload the page. (Note: you'll
              need to re-enter your name).
            </span>
          </p>
        </li>

        <li className="tip-item flex gap-2 items-start">
          <p>
            <strong>
              <Download className="tips-icon" />
              Download & Share
            </strong>
            —
            <span className="text-gray-700">
              Don't forget to save your DP and share with friends to spread the
              word.
            </span>
          </p>
        </li>

        <li className="tip-item flex gap-2 items-start">
          <p>
            <strong>
              <Share2 className="tips-icon" />
              Support the project with features
            </strong>
            —
            <span className="text-gray-700">
              Reach out to me on
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                LinkedIn
              </a>
              or
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 underline"
              >
                X
              </a>
              .
            </span>
          </p>
        </li>

        <li className="tip-item flex gap-2 items-start">
          <p>
            <strong>
              <Heart className="tips-icon" />
              Thank You!
            </strong>
            —
            <span className="text-gray-700">
              for contributing and being part of this community project.
            </span>
          </p>
        </li>
      </ul>
    </div>
  );
}
