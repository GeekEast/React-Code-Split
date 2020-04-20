import { useState, useEffect } from 'react';
import { LoDashStatic } from 'lodash';

const useLodash = () => {
  const [lodash, setLoadash] = useState<LoDashStatic>();
  useEffect(() => {
    const getModule = async () => {
      const module = await import(
        /* webpackChunkName: "lodash" */
        'lodash'
      );
      setLoadash(module.default);
    };
    getModule();
  }, []);
  return [lodash];
};

export default useLodash;
