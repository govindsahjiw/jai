////chatinterface
import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose, AiOutlineCopy, AiOutlineShareAlt, AiOutlineSend } from "react-icons/ai";
import { FaUser, FaRobot } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

type ConversationKey =
  | 'general'
  | 'benefit_0'
  | 'benefit_1'
  | 'benefit_2'
  | 'benefit_3'
  | 'reduce_development_time_by_up_to_40_percent'
  | 'improve_software_quality_by_30_50_percent'
  | 'speed_up_delivery_by_25_percent'
  | 'reduce_development_pipeline_effort_by_up_to_60_percent'
  | 'component_library'
  | 'rxjs_optimization'
  | 'performance_tuning'
  | 'ngrx_state_management'
  | 'real_time_apis'
  | 'microservices_architecture'
  | 'database_optimization'
  | 'serverless_node_js'
  | 'component_library_react'
  | 'state_management'
  | 'performance_optimization'
  | 'next_js_integration'
  | 'ai_code_generation'
  | 'automated_testing'
  | 'predictive_analytics'
  | 'natural_language_processing'
  | 'talk_to_hype'
  | 'web_application_development'
  | 'mobile_app_development'
  | 'enterprise_software_solutions'
  | 'api_system_integration'
  | 'angular_web_application_development'
  | 'enterprise_angular_solutions'
  | 'angular_component_library_development'
  | 'angular_performance_optimization'
  | 'node_js_api_development'
  | 'real_time_application_development'
  | 'serverless_node_js_solutions'
  | 'react_web_application_development'
  | 'react_native_mobile_development'
  | 'custom_react_component_development'
  | 'react_state_management_solutions'
  | 'ai_powered_application_development'
  | 'machine_learning_integration'
  | 'natural_language_processing_solutions'
  | 'predictive_analytics_implementation'
  | 'arjun_patel'
  | 'priya_sharma'
  | 'rahul_desai'
  | 'gautam_gupta'
  | 'vikram_singh'
  | 'ananya_reddy'
  | 'karan_malhotra'
  | 'divya_joshi'
  | 'rohan_mehta'
  | 'llms_for_strategic_planning'
  | 'market_research_enhancement'
  | 'content_generation'
  | 'business_growth_strategies'
  | 'competitive_analysis'
  | 'financial_forecasting'
  | 'risk_management'
  | 'key_performance_indicators'
  | 'employee_productivity_analysis'
  | 'process_automation'
  | 'customer_support_automation'
  | 'patient_data_enrichment'
  | 'medical_imaging_analysis'
  | 'predictive_analytics'
  | 'fraud_detection'
  | 'data_cleansing'
  | 'data_integration'
  | 'predictive_marketing_campaigns'
  | 'customer_segmentation'
  | 'ai_driven_cloud_optimization'
  | 'cloud_security'
  | 'ai_in_supply_chain'
  | 'ai_in_business_intelligence'
  | 'inventory_management'
  | 'logistics_optimization'
  | 'video_1'
  | 'video_2'
  | 'video_3'
  | 'video_4'
  | 'video_5'
  | 'video_6'
  | 'video_7'
  | 'video_8'
  | 'video_9';

interface ChatMessage {
  text: string;
  type: "question" | "answer";
  image?: string;
  video?: string;
}

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  conversationType?: ConversationKey;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isOpen, onClose, conversationType = 'general' }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [email, setEmail] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactInput, setContactInput] = useState({ email: '', phone: '' });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission status
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  
  const conversationMap: Record<ConversationKey, ChatMessage[]> = {
    general: [
      { text: "Welcome to Jai Info Way, official website.", type: "question" },
      {
        text: "At Jai Info Way, we specialize in **AI-powered tools** and **digital solutions** that help businesses evolve in the digital era.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      { text: "How can I help you with AI tools?", type: "question" },
      {
        text: "We provide a variety of **AI services**, including **chatbot integration**, where we automate communication processes for enhanced customer experiences.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    benefit_0: [
      { text: "You asked about reducing development time by up to 40%", type: "question" },
      {
        text: "Our AI-Powered Code Generation tools can significantly reduce development time by automating repetitive coding tasks.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    benefit_1: [
      { text: "You asked about improving software quality by 30-50%", type: "question" },
      {
        text: "Our Automated Testing with AI solution goes beyond traditional testing frameworks.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    benefit_2: [
      { text: "You asked about speeding up delivery by 25%", type: "question" },
      {
        text: "Our Modular & Reusable Components library is built on years of experience.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    benefit_3: [
      { text: "You asked about reducing deployment pipeline effort by up to 60%", type: "question" },
      {
        text: "Our Continuous Integration with AI Monitoring system not only automates your deployment pipeline but also uses AI to optimize it.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    reduce_development_time_by_up_to_40_percent: [
      { text: "You asked about reducing development time by up to 40%", type: "question" },
      {
        text: "Our AI-Powered Code Generation tools can significantly reduce development time by automating repetitive coding tasks.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    improve_software_quality_by_30_50_percent: [
      { text: "You asked about improving software quality by 30-50%", type: "question" },
      {
        text: "Our Automated Testing with AI solution goes beyond traditional testing frameworks.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    speed_up_delivery_by_25_percent: [
      { text: "You asked about speeding up delivery by 25%", type: "question" },
      {
        text: "Our Modular & Reusable Components library is built on years of experience.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    reduce_development_pipeline_effort_by_up_to_60_percent: [
      { text: "You asked about reducing deployment pipeline effort by up to 60%", type: "question" },
      {
        text: "Our Continuous Integration with AI Monitoring system not only automates your deployment pipeline but also uses AI to optimize it.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    component_library: [
      { text: "You asked about our Component Library for Angular", type: "question" },
      {
        text: "We offer over 300 pre-built Angular UI components to accelerate your development with reusable, customizable building blocks.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    rxjs_optimization: [
      { text: "You asked about RxJS Optimization", type: "question" },
      {
        text: "Our expertise in RxJS ensures faster reactive data flows, improving app responsiveness and user experience.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1633356122544-f1348ac8d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    performance_tuning: [
      { text: "You asked about Performance Tuning in Angular", type: "question" },
      {
        text: "We implement lazy loading and AOT compilation to optimize Angular app performance and reduce load times.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1593720213427-2d0c34a8a5b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    ngrx_state_management: [
      { text: "You asked about NgRx State Management", type: "question" },
      {
        text: "Our NgRx solutions provide predictable state containers for managing complex app states efficiently.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    real_time_apis: [
      { text: "You asked about Real-time APIs in Node.js", type: "question" },
      {
        text: "We build real-time APIs using WebSocket, SSE, and Push Notifications for instant data updates.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1617040619263-41c9a7ed5be2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    microservices_architecture: [
      { text: "You asked about Microservices Architecture", type: "question" },
      {
        text: "Our Node.js microservices are independently deployable, enhancing scalability and maintainability.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    database_optimization: [
      { text: "You asked about Database Optimization in Node.js", type: "question" },
      {
        text: "We optimize MongoDB and PostgreSQL performance for faster queries and efficient data handling.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    serverless_node_js: [
      { text: "You asked about Serverless Node.js", type: "question" },
      {
        text: "We leverage AWS Lambda and Firebase Functions for cost-effective, scalable serverless Node.js solutions.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1618401471353-7d2c196deployees?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    component_library_react: [
      { text: "You asked about our Component Library for React", type: "question" },
      {
        text: "We provide 150+ customizable React components to streamline your UI development process.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1633356122544-f1348ac8d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    state_management: [
      { text: "You asked about State Management in React", type: "question" },
      {
        text: "We use Redux Toolkit and Context API for efficient, scalable state management in React apps.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    performance_optimization: [
      { text: "You asked about Performance Optimization in React", type: "question" },
      {
        text: "We apply React.memo, useCallback, and code splitting to boost React app performance.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1593720213427-2d0c34a8a5b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    next_js_integration: [
      { text: "You asked about Next.js Integration", type: "question" },
      {
        text: "We integrate Next.js for SSR and SSG, enhancing SEO and performance for React applications.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    ai_code_generation: [
      { text: "You asked about AI Code Generation", type: "question" },
      {
        text: "Our AI tools accelerate development cycles by 40% through intelligent code generation.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    automated_testing: [
      { text: "You asked about Automated Testing with AI", type: "question" },
      {
        text: "We use AI for intelligent test case generation, improving coverage and reliability.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    predictive_analytics: [
      { text: "You asked about Predictive Analytics", type: "question" },
      {
        text: "Our AI-driven predictive analytics enable data-driven decision-making for your business.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    natural_language_processing: [
      { text: "You asked about Natural Language Processing", type: "question" },
      {
        text: "We integrate NLP for chatbots and voice interfaces, enhancing user interactions.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1655720828012-9bd98774ff0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    talk_to_hype: [
      {
        text: "Hello! I'm Hype, your AI assistant from Jai Infoway.",
        type: "question",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        text: "At Jai Infoway, we’re a Miami-based tech company with over 15 years of experience, transforming ideas into market-ready solutions.",
        type: "answer"
      },
      {
        text: "We’ve delivered over 100 customized projects, revolutionizing industries like healthcare, fintech, retail, and travel with innovative digital solutions. Want to know how we can empower your business?",
        type: "answer"
      },
    ],
    web_application_development: [
      { text: "You're interested in Web Application Development!", type: "question" },
      {
        text: "We craft scalable, secure, and high-performance web applications tailored to your business needs using modern frameworks and AI-driven tools.",
        type: "answer",
        image: "https://plus.unsplash.com/premium_photo-1683120966127-14162cdd0935?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
      { text: "Want to know more about our web development process?", type: "question" },
    ],
    mobile_app_development: [
      { text: "You're curious about Mobile App Development!", type: "question" },
      {
        text: "Our team builds native and cross-platform mobile apps with seamless UX/UI, leveraging AI for personalization and performance optimization.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
      { text: "Interested in discussing your mobile app idea?", type: "question" },
    ],
    enterprise_software_solutions: [
      { text: "You want to explore Enterprise Software Solutions!", type: "question" },
      {
        text: "We provide robust, custom enterprise solutions to streamline operations, enhance productivity, and integrate AI for smarter decision-making.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      { text: "How can we assist your enterprise today?", type: "question" },
    ],
    api_system_integration: [
      { text: "You're looking into API & System Integration!", type: "question" },
      {
        text: "We specialize in seamless API development and system integrations to connect your tools, automate workflows, and boost efficiency with AI enhancements.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      { text: "Need help integrating a specific system?", type: "question" },
    ],
    angular_web_application_development: [
      { text: "You asked about Angular Web Application Development!", type: "question" },
      {
        text: "We build scalable Angular web apps with modern architecture and performance optimization.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    enterprise_angular_solutions: [
      { text: "You asked about Enterprise Angular Solutions!", type: "question" },
      {
        text: "Our Angular solutions streamline enterprise workflows with robust, custom-built applications.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    angular_component_library_development: [
      { text: "You asked about Angular Component Library Development!", type: "question" },
      {
        text: "We develop reusable Angular component libraries to accelerate your development process.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    angular_performance_optimization: [
      { text: "You asked about Angular Performance Optimization!", type: "question" },
      {
        text: "We optimize Angular apps with techniques like lazy loading and AOT compilation.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1593720213427-2d0c34a8a5b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    node_js_api_development: [
      { text: "You asked about Node.js API Development!", type: "question" },
      {
        text: "We create fast, scalable APIs with Node.js for seamless system integration.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1617040619263-41c9a7ed5be2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    real_time_application_development: [
      { text: "You asked about Real-time Application Development!", type: "question" },
      {
        text: "We build real-time apps with Node.js using WebSocket and SSE for instant updates.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1617040619263-41c9a7ed5be2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    serverless_node_js_solutions: [
      { text: "You asked about Serverless Node.js Solutions!", type: "question" },
      {
        text: "Our serverless Node.js solutions leverage AWS Lambda for scalability and cost-efficiency.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1618401471353-7d2c196deployees?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    react_web_application_development: [
      { text: "You asked about React Web Application Development!", type: "question" },
      {
        text: "We craft high-performance React web apps with Next.js for SEO and speed.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1633356122544-f1348ac8d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    react_native_mobile_development: [
      { text: "You asked about React Native Mobile Development!", type: "question" },
      {
        text: "Our React Native apps deliver native performance across iOS and Android with a single codebase.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    react_state_management_solutions: [
      { text: "You asked about React State Management Solutions!", type: "question" },
      {
        text: "We implement Redux Toolkit and Context API for scalable state management in React.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    ai_powered_application_development: [
      { text: "You asked about AI-Powered Application Development!", type: "question" },
      {
        text: "We integrate AI to create smart applications that adapt and enhance user experiences.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    machine_learning_integration: [
      { text: "You asked about Machine Learning Integration!", type: "question" },
      {
        text: "Our ML integration services enable predictive insights and automation for your apps.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    natural_language_processing_solutions: [
      { text: "You asked about Natural Language Processing Solutions!", type: "question" },
      {
        text: "We provide NLP solutions for chatbots and voice interfaces to improve user interaction.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1655720828012-9bd98774ff0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    predictive_analytics_implementation: [
      { text: "You asked about Predictive Analytics Implementation!", type: "question" },
      {
        text: "We implement predictive analytics to drive data-informed decisions for your business.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
    ],
    arjun_patel: [
      { text: "You’re interested in Arjun Patel!", type: "question" },
      {
        text: "I’m Arjun Patel, a MERN Stack Lead with 9 years of experience, charging $23.96/hour. My skills include MongoDB, Express, React, Node.js, Redux, and AWS Lambda.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
      },
      {
        text: "I’ve built 50+ reusable component libraries for Fortune 500 companies. Want to discuss how I can help with your project?",
        type: "answer"
      },
    ],
    priya_sharma: [
      { text: "You’re interested in Priya Sharma!", type: "question" },
      {
        text: "I’m Priya Sharma, a MEAN Stack Architect with 7 years of experience, charging $28.50/hour. My expertise includes MongoDB, Express, Angular, Node.js, NgRx, and AWS EC2.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
      },
      {
        text: "I reduced inference costs by 82% for a Fortune 100 recommendation engine. How can I assist you today?",
        type: "answer"
      },
    ],
    rahul_desai: [
      { text: "You’re interested in Rahul Desai!", type: "question" },
      {
        text: "I’m Rahul Desai, a React/Node Specialist with 11 years of experience, charging $35.75/hour. My skills include React, Node.js, TypeScript, GraphQL, and AWS S3.",
        type: "answer",
        image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
      },
      {
        text: "I reduced AWS costs by 63% for a unicorn startup. Let’s talk about optimizing your project!",
        type: "answer"
      },
    ],
    gautam_gupta: [
      { text: "You’re interested in Gautam Gupta!", type: "question" },
      {
        text: "I’m Gautam Gupta, an Angular/Node Expert with 9 years of experience, charging $23.96/hour. My skills include Angular, Node.js, RxJS, NestJS, and AWS RDS.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1628890920690-9e29d0019b9b"
      },
      {
        text: "I achieved a 99.99% SLA for a healthcare platform. How can I support your development needs?",
        type: "answer"
      },
    ],
    vikram_singh: [
      { text: "You’re interested in Vikram Singh!", type: "question" },
      {
        text: "I’m Vikram Singh, a Full Stack (MERN) + AI developer with 7 years of experience, charging $28.50/hour. My skills include MERN Stack, Python, TensorFlow, and LLM Integration.",
        type: "answer",
        image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
      },
      {
        text: "I have a 4.9-star average rating across 15 published apps. Ready to bring AI to your project?",
        type: "answer"
      },
    ],
    ananya_reddy: [
      { text: "You’re interested in Ananya Reddy!", type: "question" },
      {
        text: "I’m Ananya Reddy, a MERN + AWS Cloud expert with 11 years of experience, charging $35.75/hour. My skills include MERN Stack, AWS Certified, Serverless, and DynamoDB.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1607990283143-e81e7a2c9349"
      },
      {
        text: "I developed SEC-compliant banking APIs. How can I help secure your application?",
        type: "answer"
      },
    ],
    karan_malhotra: [
      { text: "You’re interested in Karan Malhotra!", type: "question" },
      {
        text: "I’m Karan Malhotra, a MEAN + AI Specialist with 9 years of experience, charging $23.96/hour. My skills include MEAN Stack, PyTorch, Computer Vision, and AWS SageMaker.",
        type: "answer",
        image: "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg"
      },
      {
        text: "I cut a legacy codebase by 70% for an e-commerce giant. Want to modernize your stack?",
        type: "answer"
      },
    ],
    divya_joshi: [
      { text: "You’re interested in Divya Joshi!", type: "question" },
      {
        text: "I’m Divya Joshi, a React/Node + AI Engineer with 7 years of experience, charging $28.50/hour. My skills include React, Node.js, Python, NLP, and AWS Rekognition.",
        type: "answer",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e"
      },
      {
        text: "I’m a Certified Ethereum Developer (ConsenSys). Let’s discuss blockchain or AI for your project!",
        type: "answer"
      },
    ],
    rohan_mehta: [
      { text: "You’re interested in Rohan Mehta!", type: "question" },
      {
        text: "I’m Rohan Mehta, an Angular/Node + AWS DevOps expert with 11 years of experience, charging $35.75/hour. My skills include Angular, Node.js, AWS CDK, CI/CD, and Terraform.",
        type: "answer",
        image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
      },
      {
        text: "I scaled Next.js applications to 10M+ monthly users. How can I optimize your infrastructure?",
        type: "answer"
      },
    ],
    llms_for_strategic_planning: [
      { text: "You asked about LLMs for Strategic Planning!", type: "question" },
      {
        text: "Use LLMs to forecast trends and make data-driven decisions. Our solutions help businesses predict market shifts with precision.",
        type: "answer",
        image: "/img/llms.png"
      },
    ],
    market_research_enhancement: [
      { text: "You asked about Market Research Enhancement!", type: "question" },
      {
        text: "Leverage LLMs to analyze market trends and consumer behavior, providing actionable insights for your business strategy.",
        type: "answer",
        image: "/img/ssl.webp"
      },
    ],
    content_generation: [
      { text: "You asked about Content Generation!", type: "question" },
      {
        text: "Automate content creation using advanced language models to save time and maintain high-quality output.",
        type: "answer",
        image: "/img/cm.jpg"
      },
    ],
    business_growth_strategies: [
      { text: "You asked about Business Growth Strategies!", type: "question" },
      {
        text: "Plan strategically to scale your business effectively with AI-driven insights and tailored growth plans.",
        type: "answer",
        image: "/img/strategy1.jpg"
      },
    ],
    competitive_analysis: [
      { text: "You asked about Competitive Analysis!", type: "question" },
      {
        text: "Analyze competitors and identify opportunities for growth using AI tools to stay ahead in the market.",
        type: "answer",
        image: "https://fastercapital.com/i/Competitive-analysis--Growth-Opportunities--Identifying-Growth-Opportunities-through-Effective-Competitive-Analysis--Measuring-Success-Against-Competitors.webp"
      },
    ],
    financial_forecasting: [
      { text: "You asked about Financial Forecasting!", type: "question" },
      {
        text: "Use financial models to predict trends and optimize investments with our AI-powered forecasting tools.",
        type: "answer",
        image: "https://statics.mylandingpages.co/static/aaanxdmf26c522mp/image/cafb317ae0634cc188fcbe3b88928987.webp"
      },
    ],
    risk_management: [
      { text: "You asked about Risk Management!", type: "question" },
      {
        text: "Identify and mitigate financial risks with AI-driven tools for proactive decision-making.",
        type: "answer",
        image: "https://www.mdpi.com/risks/risks-12-00021/article_deploy/html/images/risks-12-00021-g001.png"
      },
    ],
    key_performance_indicators: [
      { text: "You asked about Key Performance Indicators!", type: "question" },
      {
        text: "Measure your business performance with actionable metrics tailored to your goals using AI analytics.",
        type: "answer",
        image: "https://www.nwasoft.com/sites/default/files/uploads/Info%20Center%20General/Metrics-KPIs-Funnel3-2.png"
      },
    ],
    employee_productivity_analysis: [
      { text: "You asked about Employee Productivity Analysis!", type: "question" },
      {
        text: "Track and improve employee productivity using AI to optimize workflows and resource allocation.",
        type: "answer",
        image: "https://www.aihr.com/wp-content/uploads/Employee-Productivity-Metrics-To-Track-cover.png"
      },
    ],
    process_automation: [
      { text: "You asked about Process Automation!", type: "question" },
      {
        text: "Automate repetitive tasks to improve efficiency and reduce operational costs with AI solutions.",
        type: "answer",
        image: "https://fastercapital.com/i/SGA-Strategies--Boosting-Efficiency-for-Startups--Automating-Repetitive-Tasks.webp"
      },
    ],
    customer_support_automation: [
      { text: "You asked about Customer Support Automation!", type: "question" },
      {
        text: "Enhance customer support with AI chatbots that provide 24/7 assistance and personalized responses.",
        type: "answer",
        image: "https://www.brainvire.com/blog/wp-content/uploads/2024/07/Benefits-of-AI-Powered-Chatbots-in-Customer-Service.jpg"
      },
    ],
    patient_data_enrichment: [
      { text: "You asked about Patient Data Enrichment!", type: "question" },
      {
        text: "Enrich patient data for better diagnostics and care using AI to process and analyze medical records.",
        type: "answer",
        image: "https://www.brainvire.com/blog/wp-content/uploads/2024/07/Benefits-of-AI-Powered-Chatbots-in-Customer-Service.jpg"
      },
    ],
    medical_imaging_analysis: [
      { text: "You asked about Medical Imaging Analysis!", type: "question" },
      {
        text: "Use AI to analyze medical images for accurate diagnoses, improving healthcare outcomes.",
        type: "answer",
        image: "https://www.brainvire.com/blog/wp-content/uploads/2024/07/Benefits-of-AI-Powered-Chatbots-in-Customer-Service.jpg"
      },
    ],
    fraud_detection: [
      { text: "You asked about Fraud Detection!", type: "question" },
      {
        text: "Detect fraudulent activities using advanced ML algorithms to protect your business.",
        type: "answer",
        image: "https://www.brainvire.com/blog/wp-content/uploads/2024/07/Benefits-of-AI-Powered-Chatbots-in-Customer-Service.jpg"
      },
    ],
    data_cleansing: [
      { text: "You asked about Data Cleansing!", type: "question" },
      {
        text: "Clean and enrich your data for better insights with AI-driven data processing tools.",
        type: "answer",
        image: "https://www.brainvire.com/blog/wp-content/uploads/2024/07/Benefits-of-AI-Powered-Chatbots-in-Customer-Service.jpg"
      },
    ],
    data_integration: [
      { text: "You asked about Data Integration!", type: "question" },
      {
        text: "Integrate data from multiple sources for a unified view, powered by AI solutions.",
        type: "answer",
        image: "https://www.brainvire.com/blog/wp-content/uploads/2024/07/Benefits-of-AI-Powered-Chatbots-in-Customer-Service.jpg"
      },
    ],
    predictive_marketing_campaigns: [
      { text: "You asked about Predictive Marketing Campaigns!", type: "question" },
      {
        text: "Use AI to create data-driven marketing strategies that maximize ROI and engagement.",
        type: "answer",
        image: "https://www.brainvire.com/blog/wp-content/uploads/2024/07/Benefits-of-AI-Powered-Chatbots-in-Customer-Service.jpg"
      },
    ],
    customer_segmentation: [
      { text: "You asked about Customer Segmentation!", type: "question" },
      {
        text: "Segment customers for targeted marketing efforts using AI-powered analytics.",
        type: "answer",
        image: "https://www.brainvire.com/blog/wp-content/uploads/2024/07/Benefits-of-AI-Powered-Chatbots-in-Customer-Service.jpg"
      },
    ],
    ai_driven_cloud_optimization: [
      { text: "You asked about AI-Driven Cloud Optimization!", type: "question" },
      {
        text: "Optimize cloud resources using AI to reduce costs and improve performance.",
        type: "answer",
        image: "https://www.brainvire.com/blog/wp-content/uploads/2024/07/Benefits-of-AI-Powered-Chatbots-in-Customer-Service.jpg"
      },
    ],
    cloud_security: [
      { text: "You asked about Cloud Security!", type: "question" },
      {
        text: "Enhance cloud security with AI-powered tools to detect and mitigate threats.",
        type: "answer",
        image: "https://www.brainvire.com/blog/wp-content/uploads/2024/07/Benefits-of-AI-Powered-Chatbots-in-Customer-Service.jpg"
      },
    ],
    ai_in_supply_chain: [
      { text: "You asked about AI in Supply Chain!", type: "question" },
      {
        text: "Integrate AI to optimize supply chain operations, improving efficiency and reducing costs.",
        type: "answer",
        image: "https://www.brainvire.com/blog/wp-content/uploads/2024/07/Benefits-of-AI-Powered-Chatbots-in-Customer-Service.jpg"
      },
    ],
    ai_in_business_intelligence: [
      { text: "You asked about AI in Business Intelligence!", type: "question" },
      {
        text: "Use AI to enhance business intelligence with deeper insights and predictive capabilities.",
        type: "answer",
        image: "https://www.brainvire.com/blog/wp-content/uploads/2024/07/Benefits-of-AI-Powered-Chatbots-in-Customer-Service.jpg"
      },
    ],
    inventory_management: [
      { text: "You asked about Inventory Management!", type: "question" },
      {
        text: "Optimize inventory with AI-driven insights to reduce waste and improve stock accuracy.",
        type: "answer",
        image: "https://www.brainvire.com/blog/wp-content/uploads/2024/07/Benefits-of-AI-Powered-Chatbots-in-Customer-Service.jpg"
      },
    ],
    logistics_optimization: [
      { text: "You asked about Logistics Optimization!", type: "question" },
      {
        text: "Streamline logistics using AI to enhance delivery efficiency and reduce operational costs.",
        type: "answer",
        image: "https://www.brainvire.com/blog/wp-content/uploads/2024/07/Benefits-of-AI-Powered-Chatbots-in-Customer-Service.jpg"
      },
    ],
    // New video-related static data
    video_1: [
      { text: "You clicked on Video 1!", type: "question" },
      {
        text: "This video showcases our AI-powered development process for rapid prototyping.",
        type: "answer",
        video: "https://jaiinfowaywebsite.s3.us-east-1.amazonaws.com/videos/1.mp4"
      },
      { text: "Want to learn more about how we can accelerate your project?", type: "question" },
    ],
    video_2: [
      { text: "You clicked on Video 2!", type: "question" },
      {
        text: "This video highlights our modular component library in action.",
        type: "answer",
        video: "https://jaiinfowaywebsite.s3.us-east-1.amazonaws.com/videos/2.mp4"
      },
      { text: "Interested in reusable components for your app?", type: "question" },
    ],
    video_3: [
      { text: "You clicked on Video 3!", type: "question" },
      {
        text: "This video demonstrates real-time API integration with Node.js.",
        type: "answer",
        video: "https://jaiinfowaywebsite.s3.us-east-1.amazonaws.com/videos/3.mp4"
      },
      { text: "Need real-time features in your application?", type: "question" },
    ],
    video_4: [
      { text: "You clicked on Video 4!", type: "question" },
      {
        text: "This video shows our AI-driven testing automation in action.",
        type: "answer",
        video: "https://jaiinfowaywebsite.s3.us-east-1.amazonaws.com/videos/4.mp4"
      },
      { text: "How can we improve your testing process?", type: "question" },
    ],
    video_5: [
      { text: "You clicked on Video 5!", type: "question" },
      {
        text: "This video explores our serverless architecture solutions.",
        type: "answer",
        video: "https://jaiinfowaywebsite.s3.us-east-1.amazonaws.com/videos/5.mp4"
      },
      { text: "Curious about serverless benefits for your project?", type: "question" },
    ],
    video_6: [
      { text: "You clicked on Video 6!", type: "question" },
      {
        text: "This video features our predictive analytics capabilities.",
        type: "answer",
        video: "https://jaiinfowaywebsite.s3.us-east-1.amazonaws.com/videos/6.mp4"
      },
      { text: "Want to leverage predictive insights for your business?", type: "question" },
    ],
    video_7: [
      { text: "You clicked on Video 7!", type: "question" },
      {
        text: "This video features our predictive analytics capabilities.",
        type: "answer",
        video: "https://jaiinfowaywebsite.s3.us-east-1.amazonaws.com/videos/7.mp4"
      },
      { text: "Want to leverage predictive insights for your business?", type: "question" },
    ],
    video_8: [
      { text: "You clicked on Video 8!", type: "question" },
      {
        text: "This video features our predictive analytics capabilities.",
        type: "answer",
        video: "https://jaiinfowaywebsite.s3.us-east-1.amazonaws.com/videos/8.mp4"
      },
      { text: "Want to leverage predictive insights for your business?", type: "question" },
    ],
    video_9: [
      { text: "You clicked on Video 9!", type: "question" },
      {
        text: "This video features our predictive analytics capabilities.",
        type: "answer",
        video: "https://jaiinfowaywebsite.s3.us-east-1.amazonaws.com/videos/3.mp4"
      },
      { text: "Want to leverage predictive insights for your business?", type: "question" },
    ],
    custom_react_component_development: []
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      setCurrentMessage("");
      setMessageIndex(0);
      setIsTyping(false);
      setShowContactForm(false);
      setShowPrompt(false);
      setInputMessage("");
      setContactInput({ email: '', phone: '' });
      setSubmissionError(null);
    } else {
      setMessages([]);
      setCurrentMessage("");
      setMessageIndex(0);
      setIsTyping(false);
      setShowContactForm(false);
      setShowPrompt(false);
      setInputMessage("");
      setContactInput({ email: '', phone: '' });
      setSubmissionError(null);
    }
  }, [isOpen, conversationType]);

// Handle form submission with API call
const handleContactSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmissionError(null);

  const data = {
    email: contactInput.email.trim(),
    phone: contactInput.phone.trim(),
  };

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbz0YiHLDkFRvy4pVOjvW9Prb1QK2nTppv658kr5QedNHk_5Efz9LEaJ6YpJu1_JrZQOJA/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        mode: "no-cors", // Use no-cors since Google Apps Script doesn't return CORS headers
      }
    );

    // Since mode is "no-cors", we can't read the response body directly
    // Assume success if no network error occurs
    if (contactInput.email && !email) setEmail(contactInput.email);
    if (contactInput.phone && !phone) setPhone(contactInput.phone);
    setShowContactForm(false);
    setContactInput({ email: '', phone: '' });
    setMessages((prev) => [
      ...prev,
      { text: "Thank you! Your contact information has been saved.", type: "answer" },
    ]);
  } catch (error) {
    console.error("Error submitting contact data:", error);
    setSubmissionError("Failed to save contact information. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  useEffect(() => {
    if (isOpen && !showContactForm && messageIndex < conversationMap[conversationType].length && !isTyping) {
      setIsTyping(true);
      let index = 0;
      const interval = setInterval(() => {
        if (index <= conversationMap[conversationType][messageIndex].text.length) {
          setCurrentMessage(conversationMap[conversationType][messageIndex].text.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
          setMessages((prev) => [...prev, conversationMap[conversationType][messageIndex]]);
          setMessageIndex((prev) => prev + 1);
          setCurrentMessage("");
          setIsTyping(false);
          if (messageIndex === conversationMap[conversationType].length - 1) {
            setShowPrompt(true);
          }

          // Show contact form after each bot message if contact info is missing
          if (!email || !phone) {
            setShowContactForm(true);
          }
        }
      }, 20);
    }
  }, [isOpen, messageIndex, isTyping, conversationType, showContactForm, email, phone]);

  const fetchOpenAIResponse = async (userMessage: string) => {
    setIsTyping(true); // Show typing indicator while waiting for OpenAI response
    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: "user", content: userMessage },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from backend');
      }

      const data = await response.json();
      const aiMessage: ChatMessage = {
        text: data.content, // Extract the content from OpenAI response
        type: "answer",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error fetching OpenAI response:', error);
      setMessages((prev) => [
        ...prev,
        { text: "Sorry, something went wrong. Please try again.", type: "answer" },
      ]);
    } finally {
      setIsTyping(false); // Hide typing indicator after response
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleShare = (text: string) => {
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  // const handleSendMessage = () => {
  //   if (inputMessage.trim()) {
  //     const newMessage: ChatMessage = { text: inputMessage, type: "question" };
  //     setMessages(prev => [...prev, newMessage]);
  //     setInputMessage("");
  //     setShowContactForm(true);
  //   }
  // };
  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: ChatMessage = { text: inputMessage, type: "question" };
      setMessages((prev) => [...prev, newMessage]);
      setInputMessage("");

      // NEW: Check if static messages are done, then use OpenAI
      if (messageIndex >= conversationMap[conversationType].length) {
        fetchOpenAIResponse(inputMessage); // Call OpenAI API via backend
      } else {
        setShowContactForm(true); // Show contact form if static messages aren't done
      }
    }
  };

  // Show contact form only after typing a few words
  const shouldShowContactForm = inputMessage.length >= 3 && !email && !phone;

  // Check if form is fully filled or partially filled when required
  const isFormFilled = (!email && contactInput.email.trim().length > 0) || (!phone && contactInput.phone.trim().length > 0);

  // Determine if close should be disabled
  const isCloseDisabled = (showContactForm && !isFormFilled && (!email || !phone));

  console.log(currentMessage, "currentMessage")

  return (
    <div
      className={`fixed bottom-0 right-0 h-[100vh] bg-white shadow-xl rounded-tl-lg rounded-tr-lg transition-all duration-300 ease-in-out z-[999] flex flex-col ${isOpen ? "w-full md:w-96" : "w-0 h-0"}`}
      style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)", border: "1px solid rgba(0, 0, 0, 0.1)" }}
    >
      {isOpen && (
        <>
          <div className="text-white p-4 rounded-tl-lg rounded-tr-lg flex justify-between items-center z-100" style={{
            background: 'linear-gradient(135deg, rgba(0, 97, 209, 0.82) 0%, rgba(49, 84, 118, 0.78) 100%)', zIndex: 9999
          }}>
            <div className="flex items-center">
              <div className="bg-white/20 p-2 rounded-full mr-3">
                <FaRobot className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">JAI Assistant</h3>
                <p className="text-xs text-blue-100">AI-powered support</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="text-white/80 hover:text-white transition-colors">
                <BsThreeDotsVertical />
              </button>
              <button onClick={onClose} className="cursor-pointer text-white/80 hover:text-white transition-colors text-xl">
                <AiOutlineClose />
              </button>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className={`transition-opacity duration-300 ${showContactForm ? 'blur-md opacity-30' : ''}`}>
              {messages.length === 0 && !isTyping && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="bg-blue-100 p-4 rounded-full mb-4">
                    <FaRobot className="text-blue-600 text-2xl" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-700">JAI InfoWay Assistant</h4>
                  <p className="text-gray-500 mt-2">How can I help you today?</p>
                </div>
              )}

              {messages.map((msg, index) => (
                <div key={index} className={`flex mb-4 ${msg.type === "question" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] flex ${msg.type === "question" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`flex-shrink-0 mt-1 ${msg.type === "question" ? "ml-3" : "mr-3"}`}>
                      {msg.type === "question" ? (
                        <div className="p-2 rounded-full" style={{
                          background: 'linear-gradient(135deg, rgba(0, 97, 209, 0.82) 0%, rgba(49, 84, 118, 0.78) 100%)'
                        }}>
                          <FaUser className="text-white text-sm" />
                        </div>
                      ) : (
                        <div className="bg-gray-200 p-2 rounded-full">
                          <FaRobot className="text-gray-700 text-sm" />
                        </div>
                      )}
                    </div>
                    <div>
                      {msg.image && (
                        <div className={`mb-2 rounded-lg overflow-hidden ${msg.type === "question" ? "ml-auto" : "mr-auto"}`}>
                          <img src={msg.image} alt="Chat content" className="w-full h-auto max-h-48 object-cover" />
                        </div>
                      )}
                      {msg.video && (
                        <div className={`mb-2 rounded-lg overflow-hidden ${msg.type === "question" ? "ml-auto" : "mr-auto"}`}>
                          <video src={msg.video} controls className="w-full h-auto max-h-48 object-cover" />
                        </div>
                      )}
                      <div className={`p-3 rounded-xl ${msg.type === "question"
                        ? "bg-gradient-to-br from-[rgba(0,97,209,0.82)] to-[rgba(49,84,118,0.78)] text-white rounded-br-none"
                        : "bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm"
                        }`}>
                        <p className="text-sm">{msg.text}</p>
                      </div>
                      <div className={`flex mt-1 ${msg.type === "question" ? "justify-end" : "justify-start"}`}>
                        <button onClick={() => handleCopy(msg.text)} className="text-gray-500 hover:text-blue-600 transition-colors p-1" title="Copy">
                          <AiOutlineCopy size={14} />
                        </button>
                        {typeof navigator.share === 'function' && (
                          <button onClick={() => handleShare(msg.text)} className="text-gray-500 hover:text-blue-600 transition-colors p-1 ml-1" title="Share">
                            <AiOutlineShareAlt size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex mb-4 justify-start">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <div className="bg-gray-200 p-2 rounded-full">
                      <FaRobot className="text-gray-700 text-sm" />
                    </div>
                  </div>
                  <div>
                    {conversationMap[conversationType][messageIndex]?.image && (
                      <div className="mb-2 rounded-lg overflow-hidden">
                        <img src={conversationMap[conversationType][messageIndex].image} alt="Chat content" className="w-full h-auto max-h-48 object-cover" />
                      </div>
                    )}
                    {conversationMap[conversationType][messageIndex]?.video && (
                      <div className="mb-2 rounded-lg overflow-hidden">
                        <video src={conversationMap[conversationType][messageIndex].video} controls className="w-full h-auto max-h-48 object-cover" />
                      </div>
                    )}
                    <div className="bg-white border border-gray-200 text-gray-800 p-3 rounded-xl rounded-bl-none shadow-sm max-w-[80%]">
                      <p className="text-sm">{currentMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              {showPrompt && (
                <div className="flex justify-center mt-4 mb-2">
                  <p className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    Ask me anything about our services
                  </p>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {(showContactForm || shouldShowContactForm) && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="relative bg-gradient-to-br from-[rgba(0,97,209,0.82)] to-[rgba(49,84,118,0.78)] rounded-xl shadow-md p-4 w-80 animate-slide-up">
                  <button
                    onClick={onClose} 
                    className={`absolute top-2 right-2 p-1 rounded-full hover:bg-white/10 transition-colors text-white`}
                  >
                    <AiOutlineClose size={16} />
                  </button>

                  <h3 className="text-sm font-semibold text-white mb-3 text-left">
                    Subscribe for Updates & Further Information
                  </h3>
                  <form onSubmit={handleContactSubmit} className="space-y-3">
                    {!email && (
                      <div>
                        <label className="block text-xs font-medium text-white">Email</label>
                        <input
                          type="email"
                          value={contactInput.email}
                          onChange={(e) => setContactInput({ ...contactInput, email: e.target.value })}
                          placeholder="Enter your email"
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-300 text-sm"
                          required
                        />
                      </div>
                    )}
                    {!phone && (
                      <div>
                        <label className="block text-xs font-medium text-white">Phone</label>
                        <input
                          type="tel"
                          value={contactInput.phone}
                          onChange={(e) => setContactInput({ ...contactInput, phone: e.target.value })}
                          placeholder="Enter your phone number"
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-300 text-sm"
                          required
                        />
                      </div>
                    )}
                    <button
                      type="submit"
                      className="w-full bg-white text-blue-600 py-1.5 px-3 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
          <div className="p-3 bg-white border-t border-gray-200">
            <div className="flex items-center">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="ml-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                <AiOutlineSend />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatInterface;
