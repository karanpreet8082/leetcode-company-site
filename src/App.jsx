// LeetCode Company-Wise Questions Static Site with Dummy Data and Links
import { useState, useEffect } from 'react';
import { Input } from "./components/ui/input";
import { Card, CardContent } from "./components/ui/card";
import { Progress } from "./components/ui/progress";

const [companyData, setCompanyData] = useState({});

useEffect(() => {
  fetch('/data.json')
    .then(res => res.json())
    .then(data => setCompanyData(data))
    .catch(err => console.error('Failed to load data:', err));
}, []);

export default function CompanyQuestions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [progressCache, setProgressCache] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('leetcode-progress');
    if (saved) setProgressCache(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('leetcode-progress', JSON.stringify(progressCache));
  }, [progressCache]);

  const toggleCheck = (company, title) => {
    const current = progressCache[company] || [];
    const updated = current.includes(title)
      ? current.filter(item => item !== title)
      : [...current, title];
    setProgressCache({ ...progressCache, [company]: updated });
  };

  return (
    <div 
      className="px-10 py-6 w-screen min-h-screen overflow-x-hidden"
      style={{ 
        backgroundImage: "url('/background.svg')",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: 'Consolas, monospace',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      }}
    >
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-white">Company-Wise Questions . . . . . . . . . . . .</h1>
        <Input
          placeholder="Search company..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="mb-6"
        />
        {Object.entries(companyData).filter(([company]) =>
          company.toLowerCase().includes(searchTerm.toLowerCase())
        ).map(([company, questions]) => {
          const completed = progressCache[company] || [];
          const percentage = Math.round((completed.length / questions.length) * 100);
          return (
            <Card key={company} className="mb-6 w-full">
              <CardContent className="p-4">
                <div className="flex items-center mb-2 gap-4">
                  <h2 className="text-xl font-semibold whitespace-nowrap min-w-[140px] text-white">{company}</h2>
                  <div className="flex-1">
                    <Progress value={percentage} />
                  </div>
                </div>
                <ul className="space-y-1 mt-2">
                  {questions.map((q, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={completed.includes(q.title)}
                        onChange={() => toggleCheck(company, q.title)}
                      />
                      <a
                        href={q.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-100 font-semibold hover:underline"
                      >
                        {q.title} <span className="ml-2 text-xs text-gray-400">[{q.difficulty}]</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}