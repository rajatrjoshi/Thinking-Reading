"use client";

import { useState, useEffect } from "react";
import SelectStudent from "@/components/selectStudent";
import { StudentList } from "@/components/selectStudent";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Data type for word assessment
type WordAssessment = {
  id: number;
  word: string;
  isCorrect: boolean | null;
  error: string;
};

function TestView({ student, onBack }: { student: StudentList, onBack: () => void }) {
  // Sample word list
  const sampleWords = [
    "cat", "dog", "run", "sit", "jump", "play", "book", "read", 
    "pen", "hat", "sun", "moon", "star", "fish", "bird", "cake", 
    "tree", "hand", "foot", "ball", "door", "road", "milk", "egg", "blue",
    // Adding more words to demonstrate scrolling
    "map", "cup", "box", "sad", "top", "win", "fan", "wet", "yes", "zip",
    "ant", "bus", "cow", "die", "ear", "fog", "gun", "hot", "ice", "jam",
    "key", "log", "man", "not", "oil", "pig", "rat", "sip", "tap", "use"
  ];
  
  // Initialize words array with the sample words
  const [words, setWords] = useState<WordAssessment[]>(() => 
    sampleWords.map((word, index) => ({
      id: index + 1,
      word: word,
      isCorrect: null,
      error: ""
    }))
  );
  
  // Function to handle checkbox change
  const handleResultChange = (id: number, isCorrect: boolean) => {
    setWords(words.map(word => {
      if (word.id === id) {
        // If marking as correct, clear any error text
        const error = isCorrect ? "" : word.error;
        return { ...word, isCorrect, error };
      }


      return word;
    }));
  };
  
  // Function to handle error input change
  const handleErrorChange = (id: number, error: string) => {
    setWords(words.map(word => 
      word.id === id ? { ...word, error } : word
    ));
  };

  // Check if all words have been assessed
  const allWordsAssessed = words.every(word => word.isCorrect !== null);
  
  // Count of remaining words to assess
  const remainingWords = words.filter(word => word.isCorrect === null).length;

  return (
    <div className="">
      <div className="pb-2 flex justify-between items-center">
        <h2 className="text-2xl font-bold">WRA Assessment</h2>
        <button 
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Back to Student Selection
        </button>
      </div>
      
      <div className="p-4 border rounded-md bg-white">
        <div className="grid grid-cols-4 gap-2">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p>{student.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Student ID</p>
            <p>{student.studentId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">School</p>
            <p>{student.schoolName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Enrollment Date</p>
            <p>{student.enrollmentDate}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-2 p-1 bg-white">
        <div className="border rounded-md">
          {/* Table with fixed header and scrollable body */}
          <div className="relative">
            {/* Fixed header */}
            <Table>
              <TableHeader className="sticky top-0 bg-white z-10">
                <TableRow>
                  <TableHead className="text-center w-[80px]">No</TableHead>
                  <TableHead className="w-[120px]">Word</TableHead>
                  <TableHead className="w-[200px]">Result</TableHead>
                  <TableHead>Error</TableHead>
                </TableRow>
              </TableHeader>
            </Table>
            
            {/* Scrollable body */}
            <div className="max-h-[500px] overflow-y-auto bg-white">
              <Table>
                <TableBody>
                  {words.map((word) => (
                    <TableRow 
                      key={word.id}
                      className="bg-white"
                    >
                      <TableCell className="text-center w-[80px]">{word.id}</TableCell>
                      <TableCell className="font-medium w-[120px]">{word.word}</TableCell>
                      <TableCell className="w-[200px]">
                        <div className="flex space-x-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id={`correct-${word.id}`} 
                              checked={word.isCorrect === true}
                              onCheckedChange={() => handleResultChange(word.id, true)}
                            />
                            <label
                              htmlFor={`correct-${word.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Correct
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id={`incorrect-${word.id}`}
                              checked={word.isCorrect === false}
                              onCheckedChange={() => handleResultChange(word.id, false)}
                            />
                            <label
                              htmlFor={`incorrect-${word.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Incorrect
                            </label>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="Student error..."
                          value={word.error}
                          onChange={(e) => handleErrorChange(word.id, e.target.value)}
                          disabled={word.isCorrect !== false}
                          className="max-w-sm"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-end mt-4 space-y-2">
        {!allWordsAssessed && (
          <p className="text-amber-600 text-sm">
            {remainingWords} word{remainingWords !== 1 ? 's' : ''} remaining
          </p>
        )}
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <button
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!allWordsAssessed}
                  onClick={() => {
                    // Logic to submit assessment results
                    console.log("Assessment results:", words);
                  }}
                >
                  Submit Assessment
                </button>
              </span>
            </TooltipTrigger>
            {!allWordsAssessed && (
              <TooltipContent>
                <p>All words must be marked as either correct or incorrect before submitting</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default function Wra() {
  const [testStarted, setTestStarted] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentList | null>(null);
  const [loading, setLoading] = useState(true);

  // Check sessionStorage for saved student on component mount
  useEffect(() => {
    try {
      const savedStudentData = sessionStorage.getItem("thinking-reading-selected-student");
      if (savedStudentData) {
        const savedStudent = JSON.parse(savedStudentData);
        if (savedStudent && savedStudent.studentId) {
          setSelectedStudent(savedStudent);
          setTestStarted(true);
        }
      }
    } catch (error) {
      console.error("Error loading saved student:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleStartTest = (student: StudentList) => {
    setSelectedStudent(student);
    setTestStarted(true);
  };

  const handleBackToSelection = () => {
    // Remove the student data from sessionStorage
    sessionStorage.removeItem("thinking-reading-selected-student");
    
    setTestStarted(false);
    setSelectedStudent(null);
  };

  if (loading) {
    return (
      <div className="w-full p-3 flex justify-center items-center min-h-[50vh]">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full p-3">
      {testStarted && selectedStudent ? (
        <TestView student={selectedStudent} onBack={handleBackToSelection} />
      ) : (
        <SelectStudent onStartTest={handleStartTest} />
      )}
    </div>
  );
}