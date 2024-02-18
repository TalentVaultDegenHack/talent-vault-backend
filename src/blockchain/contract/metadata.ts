export const contractMetadata = {
  name: 'Talent Vault Token',
  description: 'Token of the Talent Vault',
  homepage: 'https://github.com/TalentVaultDegenHack/talent-vault-contract',
  interfaces: ['TZIP-016', 'TZIP-012', 'TZIP-021'],
  license: {
    name: 'MIT',
  },
  version: '1.0',
  views: [
    {
      name: 'token_metadata',
      description: '""',
      pure: false,
      implementations: [
        {
          michelsonStorageView: {
            parameter: {
              prim: 'nat',
            },
            returnType: {
              prim: 'map',
              args: [
                {
                  prim: 'string',
                },
                {
                  prim: 'bytes',
                },
              ],
            },
            code: [
              {
                prim: 'UNPAIR',
              },
              {
                prim: 'DUP',
                args: [
                  {
                    int: '2',
                  },
                ],
              },
              {
                prim: 'GET',
                args: [
                  {
                    int: '6',
                  },
                ],
              },
              {
                prim: 'DUP',
                args: [
                  {
                    int: '2',
                  },
                ],
              },
              {
                prim: 'MEM',
              },
              {
                prim: 'IF',
                args: [
                  [],
                  [
                    {
                      prim: 'PUSH',
                      args: [
                        {
                          prim: 'string',
                        },
                        {
                          string: 'FA2_TOKEN_UNDEFINED',
                        },
                      ],
                    },
                    {
                      prim: 'FAILWITH',
                    },
                  ],
                ],
              },
              {
                prim: 'SWAP',
              },
              {
                prim: 'GET',
                args: [
                  {
                    int: '6',
                  },
                ],
              },
              {
                prim: 'SWAP',
              },
              {
                prim: 'GET',
              },
              {
                prim: 'IF_NONE',
                args: [
                  [
                    {
                      prim: 'PUSH',
                      args: [
                        {
                          prim: 'int',
                        },
                        {
                          int: '76',
                        },
                      ],
                    },
                    {
                      prim: 'FAILWITH',
                    },
                  ],
                  [],
                ],
              },
              {
                prim: 'CDR',
              },
            ],
            annotations: [],
          },
        },
      ],
    },
    {
      name: 'get_balance',
      description: '""',
      pure: false,
      implementations: [
        {
          michelsonStorageView: {
            parameter: {
              prim: 'pair',
              args: [
                {
                  prim: 'address',
                  annots: ['%owner'],
                },
                {
                  prim: 'nat',
                  annots: ['%token_id'],
                },
              ],
            },
            returnType: {
              prim: 'int',
            },
            code: [
              {
                prim: 'UNPAIR',
              },
              {
                prim: 'DUP',
                args: [
                  {
                    int: '2',
                  },
                ],
              },
              {
                prim: 'GET',
                args: [
                  {
                    int: '6',
                  },
                ],
              },
              {
                prim: 'DUP',
                args: [
                  {
                    int: '2',
                  },
                ],
              },
              {
                prim: 'CDR',
              },
              {
                prim: 'MEM',
              },
              {
                prim: 'IF',
                args: [
                  [],
                  [
                    {
                      prim: 'PUSH',
                      args: [
                        {
                          prim: 'string',
                        },
                        {
                          string: 'FA2_TOKEN_UNDEFINED',
                        },
                      ],
                    },
                    {
                      prim: 'FAILWITH',
                    },
                  ],
                ],
              },
              {
                prim: 'PUSH',
                args: [
                  {
                    prim: 'int',
                  },
                  {
                    int: '0',
                  },
                ],
              },
              {
                prim: 'DUP',
                args: [
                  {
                    int: '2',
                  },
                ],
              },
              {
                prim: 'CAR',
              },
              {
                prim: 'DIG',
                args: [
                  {
                    int: '3',
                  },
                ],
              },
              {
                prim: 'GET',
                args: [
                  {
                    int: '6',
                  },
                ],
              },
              {
                prim: 'DIG',
                args: [
                  {
                    int: '3',
                  },
                ],
              },
              {
                prim: 'CDR',
              },
              {
                prim: 'GET',
              },
              {
                prim: 'IF_NONE',
                args: [
                  [
                    {
                      prim: 'PUSH',
                      args: [
                        {
                          prim: 'int',
                        },
                        {
                          int: '86',
                        },
                      ],
                    },
                    {
                      prim: 'FAILWITH',
                    },
                  ],
                  [],
                ],
              },
              {
                prim: 'CAR',
              },
              {
                prim: 'COMPARE',
              },
              {
                prim: 'EQ',
              },
              {
                prim: 'IF',
                args: [
                  [
                    {
                      prim: 'DROP',
                    },
                    {
                      prim: 'PUSH',
                      args: [
                        {
                          prim: 'int',
                        },
                        {
                          int: '1',
                        },
                      ],
                    },
                  ],
                  [],
                ],
              },
            ],
            annotations: [],
          },
        },
      ],
    },
    {
      name: 'total_supply',
      description: '""',
      pure: false,
      implementations: [
        {
          michelsonStorageView: {
            parameter: {
              prim: 'nat',
            },
            returnType: {
              prim: 'int',
            },
            code: [
              {
                prim: 'UNPAIR',
              },
              {
                prim: 'SWAP',
              },
              {
                prim: 'GET',
                args: [
                  {
                    int: '6',
                  },
                ],
              },
              {
                prim: 'SWAP',
              },
              {
                prim: 'MEM',
              },
              {
                prim: 'IF',
                args: [
                  [],
                  [
                    {
                      prim: 'PUSH',
                      args: [
                        {
                          prim: 'string',
                        },
                        {
                          string: 'FA2_TOKEN_UNDEFINED',
                        },
                      ],
                    },
                    {
                      prim: 'FAILWITH',
                    },
                  ],
                ],
              },
              {
                prim: 'PUSH',
                args: [
                  {
                    prim: 'int',
                  },
                  {
                    int: '1',
                  },
                ],
              },
            ],
            annotations: [],
          },
        },
      ],
    },
    {
      name: 'all_tokens',
      description: '""',
      pure: false,
      implementations: [
        {
          michelsonStorageView: {
            parameter: 'None',
            returnType: {
              prim: 'list',
              args: [
                {
                  prim: 'nat',
                },
              ],
            },
            code: [
              {
                prim: 'NIL',
                args: [
                  {
                    prim: 'nat',
                  },
                ],
              },
              {
                prim: 'PUSH',
                args: [
                  {
                    prim: 'nat',
                  },
                  {
                    int: '1',
                  },
                ],
              },
              {
                prim: 'DUP',
                args: [
                  {
                    int: '3',
                  },
                ],
              },
              {
                prim: 'GET',
                args: [
                  {
                    int: '5',
                  },
                ],
              },
              {
                prim: 'COMPARE',
              },
              {
                prim: 'GT',
              },
              {
                prim: 'IF',
                args: [
                  [
                    {
                      prim: 'DROP',
                    },
                    {
                      prim: 'NIL',
                      args: [
                        {
                          prim: 'nat',
                        },
                      ],
                    },
                    {
                      prim: 'DUP',
                      args: [
                        {
                          int: '2',
                        },
                      ],
                    },
                    {
                      prim: 'GET',
                      args: [
                        {
                          int: '5',
                        },
                      ],
                    },
                    {
                      prim: 'PUSH',
                      args: [
                        {
                          prim: 'nat',
                        },
                        {
                          int: '1',
                        },
                      ],
                    },
                    {
                      prim: 'DUP',
                    },
                    {
                      prim: 'DUP',
                      args: [
                        {
                          int: '3',
                        },
                      ],
                    },
                    {
                      prim: 'COMPARE',
                    },
                    {
                      prim: 'GT',
                    },
                    {
                      prim: 'LOOP',
                      args: [
                        [
                          {
                            prim: 'DUP',
                          },
                          {
                            prim: 'DIG',
                            args: [
                              {
                                int: '3',
                              },
                            ],
                          },
                          {
                            prim: 'SWAP',
                          },
                          {
                            prim: 'CONS',
                          },
                          {
                            prim: 'DUG',
                            args: [
                              {
                                int: '2',
                              },
                            ],
                          },
                          {
                            prim: 'PUSH',
                            args: [
                              {
                                prim: 'nat',
                              },
                              {
                                int: '1',
                              },
                            ],
                          },
                          {
                            prim: 'ADD',
                          },
                          {
                            prim: 'DUP',
                          },
                          {
                            prim: 'DUP',
                            args: [
                              {
                                int: '3',
                              },
                            ],
                          },
                          {
                            prim: 'COMPARE',
                          },
                          {
                            prim: 'GT',
                          },
                        ],
                      ],
                    },
                    {
                      prim: 'DROP',
                      args: [
                        {
                          int: '2',
                        },
                      ],
                    },
                    {
                      prim: 'SWAP',
                    },
                    {
                      prim: 'DROP',
                    },
                    {
                      prim: 'NIL',
                      args: [
                        {
                          prim: 'nat',
                        },
                      ],
                    },
                    {
                      prim: 'SWAP',
                    },
                    {
                      prim: 'ITER',
                      args: [
                        [
                          {
                            prim: 'CONS',
                          },
                        ],
                      ],
                    },
                  ],
                  [
                    {
                      prim: 'SWAP',
                    },
                    {
                      prim: 'DROP',
                    },
                  ],
                ],
              },
            ],
            annotations: [],
          },
        },
      ],
    },
    {
      name: 'is_operator',
      description: '""',
      pure: false,
      implementations: [
        {
          michelsonStorageView: {
            parameter: {
              prim: 'pair',
              args: [
                {
                  prim: 'address',
                  annots: ['%owner'],
                },
                {
                  prim: 'pair',
                  args: [
                    {
                      prim: 'address',
                      annots: ['%operator'],
                    },
                    {
                      prim: 'nat',
                      annots: ['%token_id'],
                    },
                  ],
                },
              ],
            },
            returnType: {
              prim: 'bool',
            },
            code: [
              {
                prim: 'DROP',
              },
              {
                prim: 'PUSH',
                args: [
                  {
                    prim: 'bool',
                  },
                  {
                    prim: 'False',
                  },
                ],
              },
            ],
            annotations: [],
          },
        },
      ],
    },
  ],
};