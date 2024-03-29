export const contractCode = [
  {
    "prim": "storage",
    "args": [
      {
        "prim": "pair",
        "args": [
          { "prim": "big_map", "args": [ { "prim": "string" }, { "prim": "bytes" } ], "annots": [ "%metadata" ] },
          {
            "prim": "pair",
            "args": [
              { "prim": "address", "annots": [ "%minter" ] },
              {
                "prim": "pair",
                "args": [
                  { "prim": "nat", "annots": [ "%next_token_id" ] },
                  {
                    "prim": "pair",
                    "args": [
                      {
                        "prim": "big_map",
                        "args": [
                          { "prim": "nat" },
                          {
                            "prim": "pair",
                            "args": [
                              { "prim": "nat", "annots": [ "%token_id" ] }, { "prim": "map", "args": [ { "prim": "string" }, { "prim": "bytes" } ], "annots": [ "%token_info" ] }
                            ]
                          }
                        ],
                        "annots": [ "%token_metadata" ]
                      },
                      { "prim": "big_map", "args": [ { "prim": "nat" }, { "prim": "address" } ], "annots": [ "%token_owners" ] }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "prim": "parameter",
    "args": [
      {
        "prim": "or",
        "args": [
          {
            "prim": "or",
            "args": [
              {
                "prim": "pair",
                "args": [
                  {
                    "prim": "list",
                    "args": [ { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%owner" ] }, { "prim": "nat", "annots": [ "%token_id" ] } ] } ],
                    "annots": [ "%requests" ]
                  },
                  {
                    "prim": "contract",
                    "args": [
                      {
                        "prim": "list",
                        "args": [
                          {
                            "prim": "pair",
                            "args": [
                              { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%owner" ] }, { "prim": "nat", "annots": [ "%token_id" ] } ], "annots": [ "%request" ] },
                              { "prim": "nat", "annots": [ "%balance" ] }
                            ]
                          }
                        ]
                      }
                    ],
                    "annots": [ "%callback" ]
                  }
                ],
                "annots": [ "%balance_of" ]
              },
              {
                "prim": "pair",
                "args": [ { "prim": "address", "annots": [ "%owner" ] }, { "prim": "map", "args": [ { "prim": "string" }, { "prim": "bytes" } ], "annots": [ "%metadata" ] } ],
                "annots": [ "%mint" ]
              }
            ]
          },
          {
            "prim": "or",
            "args": [
              {
                "prim": "list",
                "args": [
                  {
                    "prim": "pair",
                    "args": [
                      { "prim": "address", "annots": [ "%from_" ] },
                      {
                        "prim": "list",
                        "args": [
                          {
                            "prim": "pair",
                            "args": [
                              { "prim": "address", "annots": [ "%to_" ] },
                              { "prim": "pair", "args": [ { "prim": "nat", "annots": [ "%token_id" ] }, { "prim": "nat", "annots": [ "%amount" ] } ] }
                            ]
                          }
                        ],
                        "annots": [ "%txs" ]
                      }
                    ]
                  }
                ],
                "annots": [ "%transfer" ]
              },
              {
                "prim": "list",
                "args": [
                  {
                    "prim": "or",
                    "args": [
                      {
                        "prim": "pair",
                        "args": [
                          { "prim": "address", "annots": [ "%owner" ] },
                          { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%operator" ] }, { "prim": "nat", "annots": [ "%token_id" ] } ] }
                        ],
                        "annots": [ "%add_operator" ]
                      },
                      {
                        "prim": "pair",
                        "args": [
                          { "prim": "address", "annots": [ "%owner" ] },
                          { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%operator" ] }, { "prim": "nat", "annots": [ "%token_id" ] } ] }
                        ],
                        "annots": [ "%remove_operator" ]
                      }
                    ]
                  }
                ],
                "annots": [ "%update_operators" ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "prim": "code",
    "args": [
      [
        { "prim": "UNPAIR" },
        {
          "prim": "IF_LEFT",
          "args": [
            [
              {
                "prim": "IF_LEFT",
                "args": [
                  [
                    { "prim": "NIL", "args": [ { "prim": "pair", "args": [ { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "nat" } ] }, { "prim": "nat" } ] } ] },
                    { "prim": "DUP", "args": [ { "int": "2" } ] },
                    { "prim": "CAR" },
                    {
                      "prim": "ITER",
                      "args": [
                        [
                          { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "0" } ] },
                          { "prim": "DUP", "args": [ { "int": "5" } ] },
                          { "prim": "GET", "args": [ { "int": "7" } ] },
                          { "prim": "DUP", "args": [ { "int": "3" } ] },
                          { "prim": "CDR" },
                          { "prim": "MEM" },
                          {
                            "prim": "IF",
                            "args": [
                              [
                                { "prim": "DUP", "args": [ { "int": "2" } ] },
                                { "prim": "CAR" },
                                { "prim": "DUP", "args": [ { "int": "6" } ] },
                                { "prim": "GET", "args": [ { "int": "8" } ] },
                                { "prim": "DUP", "args": [ { "int": "4" } ] },
                                { "prim": "CDR" },
                                { "prim": "GET" },
                                { "prim": "IF_NONE", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "47" } ] }, { "prim": "FAILWITH" } ], [] ] },
                                { "prim": "COMPARE" },
                                { "prim": "EQ" }
                              ],
                              [ { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "False" } ] } ]
                            ]
                          },
                          { "prim": "IF", "args": [ [ { "prim": "DROP" }, { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "1" } ] } ], [] ] },
                          { "prim": "DIG", "args": [ { "int": "2" } ] },
                          { "prim": "SWAP" },
                          { "prim": "DIG", "args": [ { "int": "2" } ] },
                          { "prim": "PAIR" },
                          { "prim": "CONS" }
                        ]
                      ]
                    },
                    { "prim": "NIL", "args": [ { "prim": "operation" } ] },
                    { "prim": "DIG", "args": [ { "int": "2" } ] },
                    { "prim": "CDR" },
                    { "prim": "PUSH", "args": [ { "prim": "mutez" }, { "int": "0" } ] },
                    { "prim": "DIG", "args": [ { "int": "3" } ] },
                    { "prim": "TRANSFER_TOKENS" },
                    { "prim": "CONS" }
                  ],
                  [
                    { "prim": "DUP", "args": [ { "int": "2" } ] },
                    { "prim": "GET", "args": [ { "int": "3" } ] },
                    { "prim": "SENDER" },
                    { "prim": "COMPARE" },
                    { "prim": "EQ" },
                    { "prim": "IF", "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_NOT_ADMIN" } ] }, { "prim": "FAILWITH" } ] ] },
                    { "prim": "DUP", "args": [ { "int": "2" } ] },
                    { "prim": "DUP" },
                    { "prim": "GET", "args": [ { "int": "8" } ] },
                    { "prim": "DUP", "args": [ { "int": "3" } ] },
                    { "prim": "CAR" },
                    { "prim": "SOME" },
                    { "prim": "DIG", "args": [ { "int": "4" } ] },
                    { "prim": "GET", "args": [ { "int": "5" } ] },
                    { "prim": "UPDATE" },
                    { "prim": "UPDATE", "args": [ { "int": "8" } ] },
                    { "prim": "SWAP" },
                    { "prim": "DUP", "args": [ { "int": "2" } ] },
                    { "prim": "DUP" },
                    { "prim": "GET", "args": [ { "int": "7" } ] },
                    { "prim": "DIG", "args": [ { "int": "2" } ] },
                    { "prim": "CDR" },
                    { "prim": "DUP", "args": [ { "int": "4" } ] },
                    { "prim": "GET", "args": [ { "int": "5" } ] },
                    { "prim": "PAIR" },
                    { "prim": "SOME" },
                    { "prim": "DIG", "args": [ { "int": "3" } ] },
                    { "prim": "GET", "args": [ { "int": "5" } ] },
                    { "prim": "UPDATE" },
                    { "prim": "UPDATE", "args": [ { "int": "7" } ] },
                    { "prim": "DUP" },
                    { "prim": "GET", "args": [ { "int": "5" } ] },
                    { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "1" } ] },
                    { "prim": "ADD" },
                    { "prim": "UPDATE", "args": [ { "int": "5" } ] },
                    { "prim": "NIL", "args": [ { "prim": "operation" } ] }
                  ]
                ]
              }
            ],
            [
              {
                "prim": "IF_LEFT",
                "args": [
                  [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_TX_DENIED" } ] }, { "prim": "FAILWITH" } ],
                  [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_OPERATORS_UNSUPPORTED" } ] }, { "prim": "FAILWITH" } ]
                ]
              }
            ]
          ]
        },
        { "prim": "PAIR" }
      ]
    ]
  }
];
