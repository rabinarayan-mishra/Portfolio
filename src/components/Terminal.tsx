import { useState, useRef, useEffect } from "react";
import "./styles/Terminal.css";

interface CommandOutput {
  command: string;
  output: React.ReactNode;
}

const SYSTEM_PROMPT = `You are Rabinarayan Mishra's AI Assistant Clone. You live inside his portfolio's interactive terminal.

Your job is to answer questions from recruiters and visitors as if you were Rabinarayan, or an assistant representing him.

Here is Rabinarayan's information:

- Name: Rabinarayan Mishra
- Role: Aspiring Data Analyst
- Education: B.Tech Computer Science & Engineering at Trident Academy of Technology, Bhubaneswar
- Graduation Year: 2026
- Location: Bhubaneswar, Odisha, India

Skills:
- Python
- MySQL
- SQL
- Excel
- Power BI
- Tableau
- Data Cleaning
- Data Handling
- Data Analysis
- Data Visualization
- Pandas
- NumPy
- Statistics
- EDA

Key Projects:
1. Airline Management System
   - Desktop-based application built using Python, Tkinter and MySQL.
   - Includes passenger registration, flight booking, seat allocation, boarding pass generation, ticket cancellation and journey details.

2. Airline Management System Analysis
   - Business Intelligence project using SQL, Excel, Power Query and Power BI.
   - Analyzes bookings, revenue, airline performance, passengers, routes and seat occupancy.

3. HR Analytics Dashboard
   - Interactive Tableau dashboard for analyzing employee demographics, departments, salary, education, performance and employment status.

4. Blinkit Analysis
   - Business analytics project analyzing Blinkit sales, product categories, outlet characteristics and business performance using Excel and Power BI.

5. COVID-19 India Dashboard
   - Interactive dashboard analyzing COVID-19 cases, recoveries, deaths, testing, vaccination and state-wise trends in India.

Training:
- NTPC Limited, Talcher, Kanihan
- Industrial Training
- Duration: 2 June 2025 to 2 July 2025
- Project: Image Stylization Using Neural Style Transfer and Pre-trained Convolutional Neural Networks

Certifications:
- Deloitte Australia – Data Analytics Job Simulation
- NTPC Industrial Training Certificate

Contact:
- Email: mrabinarayan43@gmail.com
- GitHub: rabinarayan-mishra
- LinkedIn: rabinarayan-mishra

Tone:
Professional, confident, enthusiastic, technical but approachable.
Keep answers concise, preferably under 3 sentences unless the visitor asks for details.
Do not make up qualifications, experience, projects or technologies that are not listed above.
Do not claim Rabinarayan has professional full-time experience if asked.
Keep responses as raw text suitable for a terminal.
`;

const Terminal = () => {
  const [input, setInput] = useState("");

  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: "",
      output:
        "Welcome to RabinarayanOS (v1.0.0)\nType 'help' to see available commands or 'ask <your question>' to chat with my AI assistant!",
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const terminalBodyRef = useRef<HTMLDivElement>(null);

  const askGroq = async (
    question: string,
    cmdToDisplay: string
  ) => {
    setIsLoading(true);

    setHistory((prev) => [
      ...prev,
      {
        command: cmdToDisplay,
        output: "Thinking...",
      },
    ]);

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;

      if (!apiKey) {
        throw new Error(
          "API key not found. Please add VITE_GROQ_API_KEY to your .env file."
        );
      }

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },

          body: JSON.stringify({
            model: "openai/gpt-oss-120b",

            messages: [
              {
                role: "system",
                content: SYSTEM_PROMPT,
              },
              {
                role: "user",
                content: question,
              },
            ],

            temperature: 0.7,
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(
          data.error.message || "Unknown API Error"
        );
      }

      const answer =
        data.choices?.[0]?.message?.content;

      if (!answer) {
        throw new Error(
          "No response received from AI."
        );
      }

      setHistory((prev) => {
        const newHistory = [...prev];

        newHistory[newHistory.length - 1].output =
          answer;

        return newHistory;
      });
    } catch (error: any) {
      setHistory((prev) => {
        const newHistory = [...prev];

        newHistory[newHistory.length - 1].output =
          `Error: ${error.message}`;

        return newHistory;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommand = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key !== "Enter" || isLoading) {
      return;
    }

    const cmd = input.trim();
    const lowerCmd = cmd.toLowerCase();

    let out: React.ReactNode = "";

    // HELP
    if (lowerCmd === "help") {
      out = (
        <div style={{ lineHeight: "1.8" }}>
          Available commands:
          <br />

          <span
            style={{
              color: "var(--accentColor)",
            }}
          >
            whoami
          </span>{" "}
          - About me
          <br />

          <span
            style={{
              color: "var(--accentColor)",
            }}
          >
            skills
          </span>{" "}
          - My skills
          <br />

          <span
            style={{
              color: "var(--accentColor)",
            }}
          >
            projects
          </span>{" "}
          - My projects
          <br />

          <span
            style={{
              color: "var(--accentColor)",
            }}
          >
            education
          </span>{" "}
          - My education
          <br />

          <span
            style={{
              color: "var(--accentColor)",
            }}
          >
            training
          </span>{" "}
          - My NTPC training
          <br />

          <span
            style={{
              color: "var(--accentColor)",
            }}
          >
            contact
          </span>{" "}
          - Get in touch
          <br />

          <span
            style={{
              color: "var(--accentColor)",
            }}
          >
            clear
          </span>{" "}
          - Clear terminal
          <br />

          <span
            style={{
              color: "#27c93f",
              fontWeight: "bold",
            }}
          >
            ask [question]
          </span>{" "}
          - Chat with my AI assistant
          <br />
        </div>
      );

      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: out,
        },
      ]);

      setInput("");
    }

    // WHOAMI
    else if (lowerCmd === "whoami") {
      out =
        "I'm Rabinarayan Mishra, an aspiring Data Analyst passionate about using Python, SQL, Excel, Power BI and Tableau to turn data into meaningful insights.";

      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: out,
        },
      ]);

      setInput("");
    }

    // SKILLS
    else if (lowerCmd === "skills") {
      out =
        "Languages & Query: Python, SQL, MySQL\n" +
        "Analytics: Pandas, NumPy, Statistics, EDA, Data Cleaning, Data Handling\n" +
        "Visualization & BI: Excel, Power BI, Tableau, Data Visualization";

      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: out,
        },
      ]);

      setInput("");
    }

    // PROJECTS
    else if (lowerCmd === "projects") {
      out =
        "1. Airline Management System — Python, Tkinter, MySQL\n" +
        "2. Airline Management System Analysis — SQL, Excel, Power BI\n" +
        "3. HR Analytics Dashboard — Tableau\n" +
        "4. Blinkit Analysis — Excel, Power BI\n" +
        "5. COVID-19 India Dashboard — Excel, Power BI";

      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: out,
        },
      ]);

      setInput("");
    }

    // EDUCATION
    else if (lowerCmd === "education") {
      out =
        "B.Tech Computer Science & Engineering\n" +
        "Trident Academy of Technology, Bhubaneswar\n" +
        "Graduation Year: 2026";

      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: out,
        },
      ]);

      setInput("");
    }

    // TRAINING
    else if (lowerCmd === "training") {
      out =
        "NTPC Limited, Talcher, Kanihan\n" +
        "Industrial Training: 2 June 2025 – 2 July 2025\n" +
        "Project: Image Stylization Using Neural Style Transfer and Pre-trained Convolutional Neural Networks";

      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: out,
        },
      ]);

      setInput("");
    }

    // CONTACT
    else if (lowerCmd === "contact") {
      out =
        "Email: mrabinarayan43@gmail.com\n" +
        "LinkedIn: rabinarayan-mishra\n" +
        "GitHub: rabinarayan-mishra";

      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: out,
        },
      ]);

      setInput("");
    }

    // CLEAR
    else if (lowerCmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    // SUDO
    else if (lowerCmd === "sudo") {
      out =
        "Nice try! This terminal belongs to RabinarayanOS.";

      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: out,
        },
      ]);

      setInput("");
    }

    // EMPTY
    else if (lowerCmd === "") {
      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: "",
        },
      ]);

      setInput("");
    }

    // ASK AI
    else if (lowerCmd.startsWith("ask ")) {
      const question = cmd.substring(4).trim();

      if (question) {
        askGroq(question, cmd);
        setInput("");
        return;
      }

      out = "Usage: ask <your question>";

      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: out,
        },
      ]);

      setInput("");
    }

    // UNKNOWN COMMAND → AI
    else {
      askGroq(cmd, cmd);
      setInput("");
      return;
    }
  };

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop =
        terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div
      className="terminal-section section-container"
      id="terminal"
    >
      <h2>
        Interactive <span>AI Console</span>
      </h2>

      <div className="terminal-container">
        <div
          className="terminal-window"
          onClick={() =>
            document
              .getElementById("terminal-input")
              ?.focus()
          }
        >
          {/* Terminal Header */}
          <div className="terminal-header">
            <div className="terminal-buttons">
              <span className="t-btn close-btn"></span>
              <span className="t-btn min-btn"></span>
              <span className="t-btn max-btn"></span>
            </div>

            <div className="terminal-title">
              bash - rabinarayan@portfolio: ~
            </div>
          </div>

          {/* Terminal Body */}
          <div
            className="terminal-body"
            ref={terminalBodyRef}
          >
            {history.map((h, i) => (
              <div
                key={i}
                className="terminal-line"
              >
                {h.command && (
                  <div className="command-line">
                    <span className="prompt">
                      rabinarayan@portfolio:~$
                    </span>{" "}
                    <span className="cmd-text">
                      {h.command}
                    </span>
                  </div>
                )}

                {h.output && (
                  <div
                    className="output-line"
                    style={{
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {h.output}
                  </div>
                )}
              </div>
            ))}

            {/* Input */}
            <div className="terminal-input-line">
              <span className="prompt">
                rabinarayan@portfolio:~$
              </span>

              <input
                id="terminal-input"
                type="text"
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                onKeyDown={handleCommand}
                autoComplete="off"
                spellCheck="false"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;