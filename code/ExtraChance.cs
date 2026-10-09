using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rougelette.Items
{
    public sealed class ExtraLife : Item
    {
        //Constructor
        public ExtraLife()
        {
            Name = "Extra Chance to Roll";
            Price = 3;
            Durability = 1;
        }
        //Returns enough gold for one more chance
        public int ExtraChance(int fee)
        { 
            Durability--;
            return (1 + fee);
        }
    }
}
