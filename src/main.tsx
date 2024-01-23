import React from 'react';
import { createRoot } from 'react-dom/client';
import Index from './Index';
import './index.less';
import '@/node_modules/antd/dist/antd.css';

createRoot(document.getElementById('editor-root')!).render(<Index />);
